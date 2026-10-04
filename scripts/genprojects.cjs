// Build a client-safe catalog from every CMS project, preserving the existing order.
const fs = require("node:fs");
const path = require("node:path");
const root = path.join(__dirname, "..");
const folder = path.join(root, "content/data/projects");
const output = path.join(root, "content/projects.generated.json");
const originalOrder = ["vtb-push-onboarding", "vtb-template-constructor", "lofty-homepage", "ykt-jobs", "ykt-pickup"];
const order = fs.existsSync(output)
  ? JSON.parse(fs.readFileSync(output, "utf8")).map((p) => p.slug)
  : originalOrder;
const projects = fs.readdirSync(folder).filter((f) => f.endsWith(".json")).sort()
  .map((f) => JSON.parse(fs.readFileSync(path.join(folder, f), "utf8")));
const seen = new Set();
for (const project of projects) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug) || seen.has(project.slug)) {
    throw new Error(`Invalid or duplicate project slug: ${project.slug}`);
  }
  seen.add(project.slug);
}
const rank = (slug) => order.includes(slug) ? order.indexOf(slug) : order.length;
projects.sort((a, b) => rank(a.slug) - rank(b.slug) || a.slug.localeCompare(b.slug));
fs.writeFileSync(output, JSON.stringify(projects, null, 2) + "\n");
console.log(`genprojects: ${projects.length} projects`);
