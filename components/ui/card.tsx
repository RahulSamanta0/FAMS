import * as React from "react"
import { cn } from "@/lib/utils"

/* -------------------------------- CARD -------------------------------- */

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
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

/* ----------------------------- CARD HEADER ----------------------------- */

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
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

/* ----------------------------- CARD TITLE ------------------------------ */

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        `
        text-lg font-semibold leading-none tracking-tight
        `,
        className
      )}
      {...props}
    />
  )
}

/* -------------------------- CARD DESCRIPTION --------------------------- */

function CardDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        `
        text-sm text-muted-foreground
        `,
        className
      )}
      {...props}
    />
  )
}

/* ------------------------------ CARD ACTION ---------------------------- */

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
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

/* ----------------------------- CARD CONTENT ---------------------------- */

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        `
        px-6 text-sm
        `,
        className
      )}
      {...props}
    />
  )
}

/* ------------------------------ CARD FOOTER ---------------------------- */

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
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

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
