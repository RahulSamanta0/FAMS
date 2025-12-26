import * as React from "react"
import { cn } from "@/lib/utils"

/* -------------------------------- CARD -------------------------------- */

const Card = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card"
        className={cn(
          `
          relative flex flex-col gap-6 rounded-2xl border
          bg-card text-card-foreground
          px-0 py-6
          shadow-sm
          transition-all duration-300 ease-out
          hover:-translate-y-1 hover:shadow-xl
          dark:border-slate-800
          dark:bg-slate-900/60
          backdrop-blur supports-[backdrop-filter]:bg-background/80
          `,
          className
        )}
        {...props}
      />
    )
  }
)
Card.displayName = "Card"

/* ----------------------------- CARD HEADER ----------------------------- */

const CardHeader = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card-header"
        className={cn(
          `
          @container/card-header
          grid auto-rows-min grid-rows-[auto_auto]
          items-start gap-2 px-6
          has-data-[slot=card-action]:grid-cols-[1fr_auto]
          border-b border-transparent
          transition-colors
          `,
          className
        )}
        {...props}
      />
    )
  }
)
CardHeader.displayName = "CardHeader"

/* ----------------------------- CARD TITLE ------------------------------ */

const CardTitle = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card-title"
        className={cn(
          "text-lg font-semibold leading-none tracking-tight",
          className
        )}
        {...props}
      />
    )
  }
)
CardTitle.displayName = "CardTitle"

/* -------------------------- CARD DESCRIPTION --------------------------- */

const CardDescription = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card-description"
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
      />
    )
  }
)
CardDescription.displayName = "CardDescription"

/* ------------------------------ CARD ACTION ---------------------------- */

const CardAction = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card-action"
        className={cn(
          `
          col-start-2 row-span-2 row-start-1
          self-start justify-self-end
          `,
          className
        )}
        {...props}
      />
    )
  }
)
CardAction.displayName = "CardAction"

/* ----------------------------- CARD CONTENT ---------------------------- */

const CardContent = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card-content"
        className={cn("px-6 text-sm", className)}
        {...props}
      />
    )
  }
)
CardContent.displayName = "CardContent"

/* ------------------------------ CARD FOOTER ---------------------------- */

const CardFooter = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card-footer"
        className={cn(
          `
          flex items-center gap-2 px-6
          border-t border-transparent
          pt-4
          `,
          className
        )}
        {...props}
      />
    )
  }
)
CardFooter.displayName = "CardFooter"

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}