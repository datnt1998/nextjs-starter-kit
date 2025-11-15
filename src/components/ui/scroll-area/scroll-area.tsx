"use client";

import * as React from "react";
import { ScrollArea as ScrollAreaPrimitive } from "@base-ui-components/react/scroll-area";
import { cn } from "@/lib/utils";

export interface ScrollAreaProps
  extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  children: React.ReactNode;
  className?: string;
  viewportClassName?: string;
  scrollbarClassName?: string;
  thumbClassName?: string;
}

const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  (
    {
      className,
      viewportClassName,
      scrollbarClassName,
      thumbClassName,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <ScrollAreaPrimitive.Root
        ref={ref}
        className={cn("h-96 w-96 max-w-[calc(100vw-8rem)]", className)}
        {...props}
      >
        <ScrollAreaPrimitive.Viewport
          className={cn(
            "h-full overscroll-contain rounded-md outline-1 -outline-offset-1 outline-border",
            "focus-visible:outline-2 focus-visible:outline-ring",
            viewportClassName
          )}
        >
          <div className="flex flex-col gap-4 py-3 pr-6 pl-4 text-sm leading-5.5 text-foreground">
            {children}
          </div>
        </ScrollAreaPrimitive.Viewport>
        <ScrollAreaPrimitive.Scrollbar
          className={cn(
            "m-2 flex w-1 justify-center rounded bg-muted opacity-0 transition-opacity delay-300 pointer-events-none",
            "data-hovering:opacity-100 data-hovering:delay-0 data-hovering:duration-75 data-hovering:pointer-events-auto",
            "data-scrolling:opacity-100 data-scrolling:delay-0 data-scrolling:duration-75 data-scrolling:pointer-events-auto",
            scrollbarClassName
          )}
        >
          <ScrollAreaPrimitive.Thumb
            className={cn("w-full rounded bg-border", thumbClassName)}
          />
        </ScrollAreaPrimitive.Scrollbar>
      </ScrollAreaPrimitive.Root>
    );
  }
);

ScrollArea.displayName = "ScrollArea";

export { ScrollArea };
