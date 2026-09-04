"use client";

import { useEffect, useRef } from "react";

/**
 * A field of faint dots that the cursor draws through.
 *
 * As the pointer moves, the nearest grid node lights and joins the previous
 * one with a line, so a path follows the cursor across the grid. The path
 * runs along the grid rather than straight to the cursor: when the pointer
 * jumps more than one cell, intermediate nodes are stepped one cell at a time
 * (diagonally while both axes still differ, then straight), which is what makes
 * it read as a route on a board instead of a pen stroke. Each node carries a
 * timestamp and fades out over TAIL_MS, so the tail dissolves behind the head.
 *
 * Canvas, not DOM: a 40 x 14 grid is a few hundred dots and the trail redraws
 * every frame while it is alive. The loop only runs while there is something
 * fading; at rest a single static frame is painted and nothing ticks.
 *
 * The canvas is pointer-events: none. Pointer position is read from the parent,
 * so headings and buttons over the field keep working. Coordinates come from
 * getBoundingClientRect, so the smooth scroller's transform is accounted for.
 */
const GRID = 32;
const DOT = 1.2;
const TAIL_MS = 1100;
const MAX_NODES = 28;

type Node = { c: number; r: number; t: number };

export function DotTrail({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let cols = 0;
    let rows = 0;
    let offX = 0;
    let offY = 0;
    let trail: Node[] = [];
    let frame = 0;

    const resize = () => {
      const rect = host.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.floor(width / GRID);
      rows = Math.floor(height / GRID);
      // Centre the grid so the margins are even on both sides.
      offX = (width - (cols - 1) * GRID) / 2;
      offY = (height - (rows - 1) * GRID) / 2;
      draw(performance.now());
    };

    const px = (c: number) => offX + c * GRID;
    const py = (r: number) => offY + r * GRID;

    const draw = (now: number) => {
      ctx.clearRect(0, 0, width, height);

      // The field.
      ctx.fillStyle = "rgba(255,255,255,0.13)";
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          ctx.beginPath();
          ctx.arc(px(c), py(r), DOT, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      trail = trail.filter((n) => now - n.t < TAIL_MS);
      if (trail.length === 0) return false;

      // Age can be a hair negative: rAF hands us the frame's start time, and a
      // node stamped with performance.now() a moment later is "younger" than
      // the frame. Unclamped that yields rgba(...,1.002), which is not a colour,
      // and the canvas keeps its previous fill - the 13% field grey - so the
      // whole trail drew invisibly. Clamp, always.
      const fade = (t: number) => Math.min(1, Math.max(0, 1 - (now - t) / TAIL_MS));

      // Segments, each at the alpha of its newer node.
      ctx.lineWidth = 1.25;
      ctx.lineCap = "round";
      for (let i = 1; i < trail.length; i++) {
        const a = trail[i - 1];
        const b = trail[i];
        const alpha = fade(b.t);
        ctx.strokeStyle = `rgba(226,225,255,${(alpha * 0.85).toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(px(a.c), py(a.r));
        ctx.lineTo(px(b.c), py(b.r));
        ctx.stroke();
      }

      // Lit nodes, the head largest and brightest.
      for (let i = 0; i < trail.length; i++) {
        const n = trail[i];
        const alpha = fade(n.t);
        const head = i === trail.length - 1;
        ctx.fillStyle = head
          ? `rgba(255,255,255,${alpha.toFixed(3)})`
          : `rgba(226,225,255,${(alpha * 0.9).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(px(n.c), py(n.r), head ? 3.2 : 2.1, 0, Math.PI * 2);
        ctx.fill();
        if (head) {
          ctx.fillStyle = `rgba(132,130,255,${(alpha * 0.35).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(px(n.c), py(n.r), 7, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      return true;
    };

    const tick = (now: number) => {
      frame = 0;
      if (draw(now)) frame = requestAnimationFrame(tick);
    };
    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      if (reduce || !fine) return;
      const rect = host.getBoundingClientRect();
      const c = Math.round((e.clientX - rect.left - offX) / GRID);
      const r = Math.round((e.clientY - rect.top - offY) / GRID);
      if (c < 0 || r < 0 || c >= cols || r >= rows) return;

      const now = performance.now();
      const last = trail[trail.length - 1];
      if (last && last.c === c && last.r === r) {
        last.t = now;
        return;
      }
      if (!last || now - last.t > TAIL_MS) {
        trail.push({ c, r, t: now });
      } else {
        // Walk the grid one cell at a time so the path stays on the board.
        let cc = last.c;
        let rr = last.r;
        let guard = 0;
        while ((cc !== c || rr !== r) && guard++ < 64) {
          if (cc !== c) cc += Math.sign(c - cc);
          if (rr !== r) rr += Math.sign(r - rr);
          trail.push({ c: cc, r: rr, t: now });
        }
      }
      if (trail.length > MAX_NODES) trail = trail.slice(-MAX_NODES);
      wake();
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    // On window rather than the host: the bounds check above already ignores
    // moves outside the field, and a window listener cannot be starved by
    // whatever sits on top of the canvas.
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className ?? ""}`}
    />
  );
}
