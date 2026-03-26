import type { ReactNode } from "react";

interface CheckboxProperties {
  isChecked: boolean;
  onClick: () => void;
  isIndeterminate?: boolean;
}

export function Checkbox({
  isChecked,
  onClick,
  isIndeterminate,
}: CheckboxProperties): ReactNode {
  return (
    <input
      type="checkbox"
      checked={isChecked}
      className="shrink-0 w-4 h-4 border-2 accent-primary cursor-pointer"
      onChange={onClick}
      ref={(element) => {
        if (element && isIndeterminate !== undefined) {
          element.indeterminate = isIndeterminate;
        }
      }}
    />
  );
}
