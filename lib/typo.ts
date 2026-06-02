// Typographic non-breaking-space helper.
// Glues short words (1–2 letters/digits — RU prepositions/conjunctions, EN articles,
// small numbers) to the following word, and keeps a dash from starting a new line.
// Applied at render time so the content source stays plain.

const NBSP = " ";

export function typo(input: string): string {
  if (!input) return input;
  const tokens = input.replace(/\s+/g, " ").trim().split(" ");
  let out = "";
  for (let i = 0; i < tokens.length; i++) {
    out += tokens[i];
    if (i === tokens.length - 1) break;
    const word = tokens[i].replace(/[^\p{L}\p{N}]/gu, "");
    const isShort = word.length > 0 && word.length <= 2;
    const nextIsDash = /^[—–-]+$/.test(tokens[i + 1]);
    out += isShort || nextIsDash ? NBSP : " ";
  }
  return out;
}
