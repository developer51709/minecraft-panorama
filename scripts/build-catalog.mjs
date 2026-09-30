import { readdir, writeFile } from "node:fs/promises";
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

const panoramaDirs = await walk(assetRoot);
const panoramas = [];
for (const { directory, files } of panoramaDirs) {
  const indexedFaces = new Map();
  for (const file of files) {
    const match = file.match(/^panorama_(\d+)\.(png|jpe?g|webp)$/i);
    if (match) indexedFaces.set(Number(match[1]), file);
  }
  const faces = Array.from({ length: 6 }, (_, index) => indexedFaces.get(index));
  if (faces.some((face) => !face)) continue;

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
    faces: faces.map((face) => `${basePath}/${face}`),
  });
}

panoramas.sort((left, right) => left.category.localeCompare(right.category) || left.title.localeCompare(right.title));
const groups = [...new Map(panoramas.map(({ categoryId, category }) => [categoryId, { id: categoryId, label: category }])).values()]
  .sort((left, right) => left.label.localeCompare(right.label));
await writeFile(outputPath, `${JSON.stringify({ groups, panoramas }, null, 2)}\n`);
console.log(`Catalogued ${panoramas.length} panoramas across ${groups.length} editions in ${outputPath}`);