"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * A self-contained product screen at its real desktop size, scaled to fit
 * whatever column it is given.
 *
 * Left to its own devices in a ~650px column a fluid app screen drops into its
 * stacked mobile layout and grows a scrollbar, which is not the screen anyone
 * is meant to see. So the iframe is always laid out at `intrinsic` width,
 * comfortably above the screen's own breakpoints, and the wrapper measures
 * itself and applies a transform. The result is the genuine desktop view,
 * smaller, with nothing to scroll, and identical at every viewport width
 * right down to a phone: it shrinks, it never reflows.
 *
 * The wrapper holds the intrinsic aspect ratio, so the scaled frame fills it
 * exactly and the page never reflows when the scale is applied. The first
 * server render uses a plausible default scale; the observer corrects it on
 * mount before paint settles.
 *
 * Cost control, because these demos are whole applications, not pictures:
 *
 * - A `poster` is a still of the screen, painted underneath the iframe from
 *   the first byte of HTML. The frame fades in over it once its own document
 *   has loaded, so nothing ever shows a dark hole, and the first paint of the
 *   page carries a ~35KB image instead of a ~300KB script bundle.
 * - An `eager` frame (the hero) still does not fetch until the page's own
 *   `load` event has fired and the main thread is idle. Same-origin iframes
 *   share the parent's main thread, so before this change the dashboard's
 *   React app was booting in the same window the headline was trying to paint
 *   in, and on a phone that pushed first paint out by seconds.
 * - Once a frame has loaded, its `requestAnimationFrame` is gated on
 *   visibility: callbacks queue while the frame is off screen and flush when
 *   it returns. The dashboard demo re-renders itself every frame, forever,
 *   and two copies of it (hero and closing card) were competing with the
 *   page's own scroll work. Same-origin only; a third-party URL is left alone.
 */
const DEFAULT_INTRINSIC = { width: 1100, height: 720 };

export function DemoFrame({
  src,
  title,
  intrinsic = DEFAULT_INTRINSIC,
  eager = false,
  poster,
  posterSizes = "(min-width: 80rem) 72rem, 100vw",
}: {
  src: string;
  title: string;
  intrinsic?: { width: number; height: number };
  /** Above the fold: fetch as soon as the page has loaded, rather than lazily. */
  eager?: boolean;
  /** A still of the screen, shown until the frame has loaded. Same aspect as `intrinsic`. */
  poster?: string;
  /** The `sizes` hint for the poster, matching the column the frame sits in. */
  posterSizes?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [scale, setScale] = useState(0.6);
  // Lazy frames carry their src from the server and let the browser decide
  // when to fetch. Eager frames wait for the page to finish loading first.
  const [armed, setArmed] = useState(!eager);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const measure = () => setScale(node.clientWidth / intrinsic.width);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(node);
    return () => ro.disconnect();
  }, [intrinsic.width]);

  // Arm the eager frame after the page's own load, then on the next idle slot.
  useEffect(() => {
    if (!eager) return;
    let idle = 0;
    let timer = 0;
    const arm = () => {
      // Safari has no requestIdleCallback; a short timeout is the same idea.
      if (typeof window.requestIdleCallback === "function") {
        idle = window.requestIdleCallback(() => setArmed(true), { timeout: 1500 });
      } else {
        timer = window.setTimeout(() => setArmed(true), 200);
      }
    };
    if (document.readyState === "complete") {
      arm();
    } else {
      window.addEventListener("load", arm, { once: true });
    }
    return () => {
      window.removeEventListener("load", arm);
      if (idle) window.cancelIdleCallback(idle);
      if (timer) window.clearTimeout(timer);
    };
  }, [eager]);

  // Gate the loaded frame's animation loop on whether it is on screen.
  useEffect(() => {
    if (!loaded) return;
    const node = ref.current;
    const frame = frameRef.current;
    if (!node || !frame) return;

    let win: (Window & typeof globalThis) | null = null;
    try {
      // Throws for a cross-origin document; leave those alone.
      win = frame.contentWindow as (Window & typeof globalThis) | null;
      if (!win || !win.document) return;
    } catch {
      return;
    }

    const original = win.requestAnimationFrame.bind(win);
    let visible = true;
    let queue: FrameRequestCallback[] = [];
    win.requestAnimationFrame = (cb: FrameRequestCallback) => {
      if (visible) return original(cb);
      queue.push(cb);
      return 0;
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible = entry.isIntersecting;
          if (visible && queue.length) {
            const pending = queue;
            queue = [];
            for (const cb of pending) original(cb);
          }
        }
      },
      { rootMargin: "25% 0px" },
    );
    io.observe(node);

    return () => {
      io.disconnect();
      // The frame may have navigated or been torn down; restoring is best effort.
      try {
        if (win) win.requestAnimationFrame = original;
      } catch {
        /* ignore */
      }
    };
  }, [loaded]);

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: `${intrinsic.width} / ${intrinsic.height}` }}
    >
      {poster ? (
        <Image
          src={poster}
          alt=""
          fill
          priority={eager}
          sizes={posterSizes}
          className="object-cover"
        />
      ) : null}
      <iframe
        ref={frameRef}
        src={armed ? src : undefined}
        title={title}
        loading={eager ? "eager" : "lazy"}
        sandbox="allow-scripts allow-same-origin"
        onLoad={(e) => {
          // The browser fires load for the initial about:blank too; only the
          // real document counts.
          if (!armed) return;
          try {
            if (e.currentTarget.contentWindow?.location.href === "about:blank") return;
          } catch {
            /* cross-origin: cannot be about:blank */
          }
          setLoaded(true);
        }}
        className="absolute left-0 top-0 block origin-top-left border-0 transition-opacity duration-500"
        style={{
          width: intrinsic.width,
          height: intrinsic.height,
          transform: `scale(${scale})`,
          opacity: poster && !loaded ? 0 : 1,
        }}
      />
    </div>
  );
}
