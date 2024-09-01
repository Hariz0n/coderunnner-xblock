import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/shared"

const buttonVariants = cva(
  "px-4 py-3 rounded-lg font-medium text-lg inline-flex items-center justify-center h-12",
  {
    variants: {
      variant: {
        default:
          "bg-our-blue text-our-white",
      },
      size: {
        default: "h-9 px-4 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }), 'px-4 py-3 rounded-lg font-medium text-lg inline-flex items-center justify-center h-12 cursor-pointer disabled:cursor-not-allowed disabled:bg-our-gray ')}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
