/**
 * Offline helper notes for Magias PDF text extraction.
 * Catalog runtime data lives in src/config/spells — this script is optional.
 *
 * To extract: npm i -D pdf-parse && npx tsx scripts/extract-spell-pdfs.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "scripts", "extracted");

const PDFS = [
  "Magias de Bardo.pdf",
  "Magias de Bruxo.pdf",
  "Magias de Clérigo.pdf",
  "Magias de Druida.pdf",
  "Magias de Feiticeiro.pdf",
  "Magias de Mago.pdf",
  "Magias de Paladino.pdf",
  "Magias de Patrulheiro.pdf",
];

async function main() {
  let pdfParse;
  try {
    pdfParse = require("pdf-parse");
  } catch {
    console.error(
      "Instale pdf-parse apenas para este script: npm i -D pdf-parse\nO catálogo em src/config/spells já está pronto.",
    );
    process.exit(1);
  }

  fs.mkdirSync(OUT, { recursive: true });
  for (const file of PDFS) {
    const full = path.join(ROOT, file);
    if (!fs.existsSync(full)) {
      console.warn("Ausente:", file);
      continue;
    }
    const buffer = fs.readFileSync(full);
    const data = await pdfParse(buffer);
    const outFile = path.join(OUT, file.replace(/\.pdf$/i, ".txt"));
    fs.writeFileSync(outFile, data.text, "utf8");
    console.log("OK", file, "→", outFile);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
