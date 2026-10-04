const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");
const root = path.join(__dirname, "..");
const catalog = JSON.parse(fs.readFileSync(path.join(root, "content/projects.generated.json"), "utf8"));
const files = fs.readdirSync(path.join(root, "content/data/projects")).filter((f) => f.endsWith(".json"));
assert.equal(catalog.length, files.length, "Every CMS case must appear in the catalog");
for (const locale of ["ru", "en"]) {
  const prefix = locale === "en" ? "/en" : "";
  for (const route of ["/", "/about/", ...catalog.map((p) => `/work/${p.slug}/`)]) {
    const url = prefix + route;
    const html = fs.readFileSync(path.join(root, "out", url, "index.html"), "utf8");
    assert.ok(html.includes(`<html lang="${locale}"`), `Wrong language: ${url}`);
    assert.ok(html.includes(`<link rel="canonical" href="https://petrafanasyev.com${url}"`), `Wrong canonical: ${url}`);
    for (const [lang, href] of [["ru", route], ["en", `/en${route}`]]) {
      assert.ok(html.includes(`hrefLang="${lang}" href="https://petrafanasyev.com${href}"`), `Wrong alternate: ${url}`);
    }
  }
}
// Exercise the actual TSX text splitters, not a duplicated implementation.
const compiled = ts.transpileModule(fs.readFileSync(path.join(root, "lib/reveal.tsx"), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;
const exportsObject = {};
vm.runInNewContext(compiled, { exports: exportsObject, require });
const { renderToStaticMarkup } = require("react-dom/server");
for (const split of [exportsObject.revealChars, exportsObject.revealWords]) {
  const html = renderToStaticMarkup(split("Живу в\u00a0Москве", { i: 0 }, 0, 1));
  assert.ok(html.includes("\u00a0"), "Animated text must preserve NBSP");
}
console.log(`Export checks passed: ${(catalog.length + 2) * 2} pages, catalog, and both text splitters`);
