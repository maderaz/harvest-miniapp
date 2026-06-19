// Legal footer shown at the bottom of the home view: terms/privacy consent
// plus a short audit note. External links open in a new tab.
export function LegalFooter() {
  return (
    <footer className="legal-footer">
      <p>
        By participating in any of the products you accept our{" "}
        <a href="https://www.harvest.finance/terms" target="_blank" rel="noopener noreferrer">
          Terms of Use
        </a>{" "}
        and{" "}
        <a href="https://www.harvest.finance/privacy" target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </a>
        .
      </p>
      <p>
        Harvest&apos;s smart contracts have been independently{" "}
        <a href="https://www.harvest.finance/security" target="_blank" rel="noopener noreferrer">
          audited
        </a>
        , but audits don&apos;t remove risk &mdash; only deposit what you can afford to lose.
      </p>
    </footer>
  );
}
