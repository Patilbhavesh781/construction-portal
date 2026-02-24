import * as React from "react"
import { cn } from "@/lib/utils"

function Card({ className, ...props }, ref) {
  return (
    <div ref={ref} className={cn("rounded-lg border bg-white text-foreground shadow-sm", className)} {...props} />
  )
}

function CardHeader({ className, ...props }, ref) {
  return (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  )
}

function CardTitle({ className, ...props }, ref) {
  return (
    <h3 ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
  )
}

function CardDescription({ className, ...props }, ref) {
  return (
    <p ref={ref} className={cn("text-sm text-gray-500", className)} {...props} />
  )
}

function CardContent({ className, ...props }, ref) {
  return (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
}

function CardFooter({ className, ...props }, ref) {
  return (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  )
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
