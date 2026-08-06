/**
 * Regenerates every brand asset in `public/assets/` from the two source logo
 * files. Run it with `npm run brand` after replacing anything in
 * `assets-source/`.
 *
 * Why this exists rather than someone exporting PNGs by hand: the icon set has
 * three different safe-area requirements (browser tab, Android maskable, iOS
 * squircle) and getting one of them wrong is invisible until the icon ships. The
 * sizes below encode those rules once.
 */
import { createRequire } from "node:module";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "assets-source");
const OUT = path.join(ROOT, "public", "assets");

const SRC_MARK = path.join(SRC, "logo-mark-source.png");
const SRC_WORD = path.join(SRC, "logo-wordmark-source.png");

for (const f of [SRC_MARK, SRC_WORD]) {
  if (!existsSync(f)) throw new Error(`missing source file: ${f}`);
}

/**
 * Content boxes measured off each source's ALPHA channel, not eyeballed.
 *
 * Both sources are 1024x1024 with the artwork floating in a transparent field,
 * and — this is the part that bites — the transparent pixels still carry the
 * generator's purple RGB. Anything that composites or downscales the untrimmed
 * file drags that purple in as a halo, and previewing one makes the sharp
 * artwork look like an out-of-focus glow. Always crop to these boxes first.
 */
const BOX_MARK = { left: 271, top: 248, width: 482, height: 418 };
const BOX_WORD = { left: 156, top: 432, width: 695, height: 100 };

/** Deep navy plate; matches theme_color / background_color in site.webmanifest. */
const PLATE = "#010D2E";

/**
 * The artwork is a smooth two-stop gradient, so a 256-colour palette is
 * indistinguishable from full RGBA at any size this ships at — and roughly 6x
 * smaller. The full-fat mark is 483KB, which has no business in a 28px nav.
 */
const PNG = { compressionLevel: 9, palette: true, colors: 256 };

const mark = () => sharp(SRC_MARK).extract(BOX_MARK);
const word = () => sharp(SRC_WORD).extract(BOX_WORD);

const written = [];
async function write(name, pipeline) {
  const file = path.join(OUT, name);
  const info = await pipeline.png(PNG).toFile(file);
  written.push(
    `${name.padEnd(22)} ${String(info.width).padStart(4)}x${String(info.height).padEnd(4)} ${(info.size / 1024).toFixed(1).padStart(6)}KB`,
  );
}

/**
 * One icon on a solid plate.
 *
 * `cover` is the fraction of the canvas the mark's long edge occupies, and it
 * is the whole game: too small and the tab icon is unreadable, too large and
 * Android's maskable crop shaves the corners off.
 *
 * `radius` is in canvas fractions. 0 means full-bleed square, which is correct
 * for anything the OS masks itself.
 */
async function icon(name, size, cover, radius = 0) {
  const resized = await mark()
    .resize({ width: Math.round(size * cover), kernel: "lanczos3" })
    .png()
    .toBuffer();
  const { width, height } = await sharp(resized).metadata();

  const base =
    radius > 0
      ? sharp(
          Buffer.from(
            `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">` +
              `<rect width="${size}" height="${size}" rx="${Math.round(size * radius)}" ` +
              `ry="${Math.round(size * radius)}" fill="${PLATE}"/></svg>`,
          ),
        )
      : sharp({
          create: { width: size, height: size, channels: 4, background: PLATE },
        });

  await write(
    name,
    base.composite([
      {
        input: resized,
        left: Math.round((size - width) / 2),
        top: Math.round((size - height) / 2),
      },
    ]),
  );
}

/* -- lockup pieces ---------------------------------------------------------
   Transparent, sized for a ~28px nav at 4x so they stay sharp on any display
   and still leave headroom if the lockup is ever used larger. */

await write("logo-mark.png", mark().resize({ height: 120, kernel: "lanczos3" }));
await write("logo-wordmark.png", word().resize({ height: 70, kernel: "lanczos3" }));

/* -- icons ----------------------------------------------------------------- */

// Browser tab. Rounded, because nothing masks this one, and pushed as large as
// the frame allows since 32px is where detail dies.
await icon("favicon-32.png", 32, 0.88, 0.22);
await icon("favicon-48.png", 48, 0.88, 0.22);

// Declared "any maskable" in site.webmanifest. Android may crop to a circle of
// 80% diameter, and 0.64 keeps the artwork's corners inside that circle.
await icon("icon-192.png", 192, 0.64);
await icon("icon-512.png", 512, 0.64);

// iOS applies its own squircle and ignores transparency: solid plate, square,
// and slightly tighter than maskable because the crop is gentler.
await icon("apple-touch-icon.png", 180, 0.72);

console.log(`brand assets -> ${path.relative(ROOT, OUT)}`);
for (const line of written) console.log(`  ${line}`);
