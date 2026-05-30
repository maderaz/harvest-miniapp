// Harvest wordmark + Sunflower Gold pip. Markup mirrors logo.md so the
// hover hop + colour flip behave exactly as the brand guideline describes.
export function HarvestLogo() {
  return (
    <a href="/" className="brand" aria-label="Harvest, go to homepage">
      <span className="brand-name">Harvest</span>
      <span className="brand-dot" aria-hidden="true" />
    </a>
  );
}
