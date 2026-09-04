"use client";

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
 */
const DEFAULT_INTRINSIC = { width: 1100, height: 720 };

export function DemoFrame({
  src,
  title,
  intrinsic = DEFAULT_INTRINSIC,
  eager = false,
}: {
  src: string;
  title: string;
  intrinsic?: { width: number; height: number };
  /** Above the fold: fetch immediately instead of lazily. */
  eager?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.6);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const measure = () => setScale(node.clientWidth / intrinsic.width);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(node);
    return () => ro.disconnect();
  }, [intrinsic.width]);

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: `${intrinsic.width} / ${intrinsic.height}` }}
    >
      <iframe
        src={src}
        title={title}
        loading={eager ? "eager" : "lazy"}
        sandbox="allow-scripts allow-same-origin"
        className="absolute left-0 top-0 block origin-top-left border-0"
        style={{
          width: intrinsic.width,
          height: intrinsic.height,
          transform: `scale(${scale})`,
        }}
      />
    </div>
  );
}
