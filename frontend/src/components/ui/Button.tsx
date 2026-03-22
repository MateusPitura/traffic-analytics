import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const buttonVariants = cva(
  "inline-flex items-center rounded-lg text-md font-medium transition-colors px-3 py-1 cursor-pointer focus:outline-none hover:opacity-75 active:brightness-90!",
  {
    variants: {
      variant: {
        primary: "bg-primary text-on-primary",
        secondary: "bg-transparent border-2 border-primary text-primary",
      },
      width: {
        fit: "w-fit justify-center",
        full: "w-full justify-start",
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
}

export function Button({ className, label, onClick, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants(props), className)} onClick={onClick}>
      {label}
    </button>
  );
}
