/* Microsoft Fluent 3D "Waving hand" used briefly on load as a wave micro-interaction. */
export function WaveHand({ size = 36 }: { size?: number }) {
  return (
    <span className="wave-hand inline-block align-[-0.18em]">
      <img
        src="/images/wave.png"
        alt="👋"
        width={size}
        height={size}
        loading="eager"
        decoding="async"
        draggable={false}
        style={{ width: size, height: size, display: "block" }}
      />
    </span>
  );
}
