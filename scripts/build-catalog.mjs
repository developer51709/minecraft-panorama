import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const assetRoot = path.resolve("assets");
const outputPath = path.join(assetRoot, "catalog.json");
const categoryLabels = new Map([
  ["April_Fools", "April Fools'"],
  ["Bedrock", "Bedrock Edition"],
  ["Bedrock_Vibrant_Visuals", "Bedrock Vibrant Visuals"],
  ["Education", "Education Edition"],
  ["Java", "Java Edition"],
  ["Java_and_Bedrock", "Java + Bedrock"],
  ["Others", "Other Editions"],
]);

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = entries.filter((entry) => entry.isFile()).map((entry) => entry.name);
  const uiPath = path.basename(directory) === "ui" && path.basename(path.dirname(directory)) === "textures"
    ? directory
    : null;
  const result = uiPath ? [{ uiPath, files, directory }] : [];
  for (const entry of entries) {
    if (entry.isDirectory()) result.push(...await walk(path.join(directory, entry.name)));
  }
  return result;
}

function titleFor(packName) {
  return packName
    .replace(/_(java|bedrock|education)$/i, "")
    .replace(/-bedrock-vv$/i, "")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

// Faces smaller than this are placeholder stubs, not real panorama art.
const MIN_FACE_SIZE = 32;

function imageSize(buffer) {
  if (buffer.length > 24 && buffer[0] === 0x89 && buffer.toString("ascii", 1, 4) === "PNG") {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }
  if (buffer.length > 4 && buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2;
    while (offset + 9 <= buffer.length) {
      if (buffer[offset] !== 0xff) { offset += 1; continue; }
      const marker = buffer[offset + 1];
      if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
        return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
      }
      offset += 2 + buffer.readUInt16BE(offset + 2);
    }
  }
  if (buffer.length > 30 && buffer.toString("ascii", 0, 4) === "RIFF" && buffer.toString("ascii", 8, 12) === "WEBP") {
    const format = buffer.toString("ascii", 12, 16);
    if (format === "VP8X") return { width: 1 + buffer.readUIntLE(24, 3), height: 1 + buffer.readUIntLE(27, 3) };
    if (format === "VP8 ") return { width: buffer.readUInt16LE(26) & 0x3fff, height: buffer.readUInt16LE(28) & 0x3fff };
    if (format === "VP8L") {
      const bits = buffer.readUInt32LE(21);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
  }
  return null;
}

const panoramaDirs = await walk(assetRoot);
const panoramas = [];
for (const { directory, files } of panoramaDirs) {
  const indexedFaces = new Map();
  for (const file of files) {
    const match = file.match(/^panorama_(\d+)\.(png|jpe?g|webp)$/i);
    if (match) indexedFaces.set(Number(match[1]), file);
  }
  const faces = Array.from({ length: 6 }, (_, index) => indexedFaces.get(index));
  const imageFile = files.find((file) => /^panorama\.(png|jpe?g|webp)$/i.test(file));
  const complete = faces.every(Boolean);

  // A pack is only a real cubemap when every face exists and is a full-size image.
  // Some packs instead ship a single flat background next to 1x1 placeholder faces.
  let hasCubemap = false;
  if (complete) {
    const sizes = [];
    for (const face of faces) sizes.push(imageSize(await readFile(path.join(directory, face))));
    hasCubemap = sizes.every((size) => size && size.width >= MIN_FACE_SIZE && size.height >= MIN_FACE_SIZE);
  }
  if (!hasCubemap && !imageFile) continue;

  const relativeUiPath = path.relative(assetRoot, directory).split(path.sep);
  const categoryId = relativeUiPath[0];
  const packName = relativeUiPath.at(-3);
  const category = categoryLabels.get(categoryId) ?? categoryId.replace(/[_-]+/g, " ");
  const basePath = path.relative(process.cwd(), directory).split(path.sep).join("/");
  panoramas.push({
    id: `${categoryId}/${packName}`,
    title: titleFor(packName),
    category,
    categoryId,
    hasCubemap,
    image: imageFile ? `${basePath}/${imageFile}` : null,
    faces: hasCubemap ? faces.map((face) => `${basePath}/${face}`) : [],
  });
}

panoramas.sort((left, right) => left.category.localeCompare(right.category) || left.title.localeCompare(right.title));
const groups = [...new Map(panoramas.map(({ categoryId, category }) => [categoryId, { id: categoryId, label: category }])).values()]
  .sort((left, right) => left.label.localeCompare(right.label));
await writeFile(outputPath, `${JSON.stringify({ groups, panoramas }, null, 2)}\n`);
const cubemaps = panoramas.filter((panorama) => panorama.hasCubemap).length;
console.log(`Catalogued ${panoramas.length} entries (${cubemaps} cubemaps, ${panoramas.length - cubemaps} flat-only) across ${groups.length} editions in ${outputPath}`);