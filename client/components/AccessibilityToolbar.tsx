import React from "react";
import { NavAccessibilityControls } from "./NavAccessibilityControls";

/**
 * @deprecated Use NavAccessibilityControls mounted in the top navigation bar instead.
 */
export const AccessibilityToolbar: React.FC = () => {
  return <NavAccessibilityControls />;
};

export default AccessibilityToolbar;
