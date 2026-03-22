import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const buttonVariants = cva(
  "inline-flex items-center rounded-lg text-md font-medium transition-colors px-3 py-1 cursor-pointer focus:outline-none hover:opacity-75 active:brightness-90!",
  {
    variants: {
      variant: {
        primary: "bg-primary text-on-primary",
        secondary: "bg-transparent border-2 border-primary text-primary",
        tertiary: "bg-transparent text-primary",
      },
      width: {
        fit: "w-fit justify-center",
        full: "w-full justify-start",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed pointer-events-none",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      width: "fit",
    },
  }
);

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  className?: string;
  label: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

export function Button({
  className,
  label,
  onClick,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants(props), className)}
      onClick={onClick}
      type={type}
    >
      {label}
    </button>
  );
}
