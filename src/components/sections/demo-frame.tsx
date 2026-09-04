"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The dialer demo at its real desktop size, scaled to fit whatever column it
 * is given.
 *
 * Left to its own devices in a ~650px column the demo drops into its stacked
 * mobile layout and grows a scrollbar, which is not the screen anyone is meant
 * to see. So the iframe is always laid out at INTRINSIC width, comfortably
 * above the demo's own 980px breakpoint, and the wrapper measures itself and
 * applies a transform. The result is the genuine three-column live-call view,
 * smaller, with nothing to scroll.
 *
 * The wrapper holds the intrinsic aspect ratio, so the scaled frame fills it
 * exactly and the page never reflows when the scale is applied. The first
 * server render uses a plausible default scale; the observer corrects it on
 * mount before paint settles.
 */
const INTRINSIC = { width: 1100, height: 720 };

export function DemoFrame({ src, title }: { src: string; title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.6);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const measure = () => setScale(node.clientWidth / INTRINSIC.width);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(node);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: `${INTRINSIC.width} / ${INTRINSIC.height}` }}
    >
      <iframe
        src={src}
        title={title}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin"
        className="absolute left-0 top-0 block origin-top-left border-0"
        style={{
          width: INTRINSIC.width,
          height: INTRINSIC.height,
          transform: `scale(${scale})`,
        }}
      />
    </div>
  );
}
