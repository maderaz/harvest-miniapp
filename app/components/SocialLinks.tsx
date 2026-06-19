import { DiscordIcon, XIcon } from "./icons";

// Community links, shown under the product list and above the legal text.
export function SocialLinks() {
  return (
    <div className="social-row">
      <a
        href="https://twitter.com/harvest_finance"
        target="_blank"
        rel="noopener noreferrer"
        className="social-link"
        aria-label="Harvest on X"
      >
        <XIcon size={18} />
      </a>
      <a
        href="https://discord.gg/xHXe3tYjPY"
        target="_blank"
        rel="noopener noreferrer"
        className="social-link"
        aria-label="Harvest on Discord"
      >
        <DiscordIcon size={20} />
      </a>
    </div>
  );
}
