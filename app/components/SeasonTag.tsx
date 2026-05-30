import { BaseMark } from "./icons";

// Compact Base season marker shown in the top-right of every view.
export function SeasonTag() {
  return (
    <span className="season-tag">
      <span className="season-tag-icon" aria-hidden="true">
        <BaseMark size={15} tone="white" />
      </span>
      <span className="season-tag-text">Base season</span>
    </span>
  );
}
