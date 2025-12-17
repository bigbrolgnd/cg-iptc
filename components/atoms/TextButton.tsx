import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

export interface TextButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isActive?: boolean;
}

const TextButton = forwardRef<HTMLButtonElement, TextButtonProps>(
    ({ className, isActive, children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "font-bold uppercase tracking-wider text-sm transition-colors hover:text-red-700 cursor-pointer",
                    isActive ? "text-black" : "text-zinc-500",
                    className
                )}
                {...props}
            >
                {children}
            </button>
        );
    }
);
TextButton.displayName = "TextButton";

export { TextButton };
