import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-badge px-3 py-1 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        gold: "bg-gold/20 text-gold border border-gold/30",
        navy: "bg-navy text-white border border-white/10",
        success: "bg-green-500/20 text-green-400 border border-green-500/30",
        sold: "bg-red-500/20 text-red-400 border border-red-500/30",
      },
    },
    defaultVariants: {
      variant: "gold",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
