import fs from "fs";
import YAML from "yaml";
import { YAMLMap, YAMLSeq } from "yaml/types";

// Read the YAML file
const inputPath = "openapi.yml";
const outputPath = "openapi.noanchors.yml";
const raw = fs.readFileSync(inputPath, "utf8");

// Parse with YAML, preserving anchors
const doc = YAML.parseDocument(raw, {
  keepCstNodes: true,
  keepNodeTypes: true,
});

// Collect all anchors
const anchors: Record<string, any> = {};
if (doc.contents instanceof YAMLMap || doc.contents instanceof YAMLSeq) {
  const items = doc.contents.items;
  for (const item of items) {
    // For maps, item.key.anchor; for seq, item.anchor
    if (doc.contents instanceof YAMLMap && item.key && item.key.anchor) {
      anchors[item.key.anchor] = item.value;
    } else if (doc.contents instanceof YAMLSeq && item.anchor) {
      anchors[item.anchor] = item;
    }
  }
}

// Recursively replace aliases with anchor content
function expandAliases(node: any): any {
  if (!node) return node;
  if (node.type === "ALIAS" && node.source) {
    const expanded = anchors[node.source];
    // Replace the alias node in its parent
    Object.assign(node, expanded);
    return node;
  }
  if (node.items && Array.isArray(node.items)) {
    node.items.forEach(expandAliases);
  }
  if (node.value && typeof node.value === "object") {
    expandAliases(node.value);
  }
  return node;
}

// Expand all aliases in the document
expandAliases(doc.contents);

// Stringify and write the new YAML
const output = doc.toString();
fs.writeFileSync(outputPath, output, "utf8");

console.log(`Expanded YAML written to ${outputPath}`);
