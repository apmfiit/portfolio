import type { Key, ReactNode } from "react";

/* Server-side text splitters for the soft-blur-in queued hero load.
   Each animated unit gets the `.sbi-unit` class + a computed animation-delay,
   so the reveal is pure CSS (no client JS). A shared Ctx counter advances the
   stagger across calls within one block. Atomic nodes (wave, VTB stripe, links)
   are animated as single units so they keep working. */

export type Ctx = { i: number };

function nextDelay(ctx: Ctx, base: number, stagger: number): string {
  const d = base + ctx.i * stagger;
  ctx.i += 1;
  return `${d}ms`;
}

export function revealUnit(
  node: ReactNode,
  ctx: Ctx,
  base: number,
  stagger: number,
  key?: Key,
): ReactNode {
  return (
    <span
      key={key}
      className="sbi-unit"
      style={{ animationDelay: nextDelay(ctx, base, stagger) }}
    >
      {node}
    </span>
  );
}

/* Per-character: each word is wrapped so it never breaks mid-word; chars animate. */
export function revealChars(
  text: string,
  ctx: Ctx,
  base: number,
  stagger: number,
  keyp = "",
): ReactNode[] {
  const out: ReactNode[] = [];
  text.split(/(\s+)/).forEach((part, pi) => {
    if (part === "") return;
    if (/^\s+$/.test(part)) {
      out.push(
        <span key={`${keyp}s${pi}`} style={{ whiteSpace: "pre" }}>
          {part}
        </span>,
      );
      return;
    }
    const glyphs = Array.from(part).map((ch, ci) => (
      <span
        key={ci}
        className="sbi-unit"
        style={{ animationDelay: nextDelay(ctx, base, stagger) }}
      >
        {ch}
      </span>
    ));
    out.push(
      <span key={`${keyp}w${pi}`} className="inline-block whitespace-nowrap">
        {glyphs}
      </span>,
    );
  });
  return out;
}

/* Per-word. */
export function revealWords(
  text: string,
  ctx: Ctx,
  base: number,
  stagger: number,
  keyp = "",
): ReactNode[] {
  const out: ReactNode[] = [];
  text.split(/(\s+)/).forEach((part, pi) => {
    if (part === "") return;
    if (/^\s+$/.test(part)) {
      out.push(
        <span key={`${keyp}s${pi}`} style={{ whiteSpace: "pre" }}>
          {part}
        </span>,
      );
      return;
    }
    out.push(
      <span
        key={`${keyp}w${pi}`}
        className="sbi-unit"
        style={{ animationDelay: nextDelay(ctx, base, stagger) }}
      >
        {part}
      </span>,
    );
  });
  return out;
}
