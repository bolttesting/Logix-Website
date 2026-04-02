/** Lightweight placeholder while a lazy route chunk loads — keeps layout stable without heavy UI. */
export default function PageFallback() {
  return (
    <div
      className="page-fallback"
      aria-busy="true"
      aria-live="polite"
    />
  );
}
