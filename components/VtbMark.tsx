import type { CSSProperties } from "react";

/* The three-stripe mark extracted from the official VTB 2018 logo
   (commons VTB_Logo_2018.svg, the #009FDF "Fill-1" path). viewBox matches
   the stripes' own bounds so it can be placed beside the "ВТБ" wordmark
   exactly as in the logo lockup. */
export function VtbMark({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 27.9192 17.1295"
      className={className}
      style={style}
      role="img"
      aria-label="ВТБ"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#009FDF"
        d="M6.25065367,0 L4.68701481,4.28311036 L26.3555573,4.28311036 L27.9191962,0 L6.25065367,0 Z M3.90470765,6.423693 L2.34106879,10.7058308 L24.0096113,10.7058308 L25.5732502,6.423693 L3.90470765,6.423693 Z M1.56363886,12.847386 L0,17.1295238 L21.6685425,17.1295238 L23.231206,12.847386 L1.56363886,12.847386 Z"
      />
    </svg>
  );
}
