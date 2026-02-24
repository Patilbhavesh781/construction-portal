import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow-md hover:shadow-lg active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-orange-500 text-white hover:bg-orange-600",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        outline: "border-2 border-orange-500 bg-white hover:bg-orange-50 text-orange-600",
        secondary: "bg-gray-500 text-white hover:bg-gray-600",
        ghost: "bg-transparent hover:bg-gray-100 text-gray-900 hover:text-orange-600",
        link: "bg-transparent underline-offset-4 hover:underline text-orange-500",
        hero: "bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold px-8 py-4 text-lg shadow-xl hover:shadow-2xl",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = ({ className, variant = "default", size = "default", children, ...props }) => {
  return (
    <button 
      className={cn(buttonVariants({ variant, size, className }))} 
      type="button"
      {...props}
    >
      {children}
    </button>
  )
}

export { Button, buttonVariants }
