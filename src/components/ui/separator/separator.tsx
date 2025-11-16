"use client";

import * as React from "react";
import { Separator as BaseSeparator } from "@base-ui-components/react/separator";
import { cn } from "@/lib/utils";
import {
  separatorVariants,
  type SeparatorVariants,
} from "./separator.variants";

export interface SeparatorProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseSeparator>, "orientation">,
    SeparatorVariants {}

const Separator = React.forwardRef<HTMLHRElement, SeparatorProps>(
  ({ className, orientation = "horizontal", variant, ...props }, ref) => {
    return (
      <BaseSeparator
        ref={ref}
        orientation={orientation || "horizontal"}
        className={cn(separatorVariants({ orientation, variant }), className)}
        {...props}
      />
    );
  }
);

Separator.displayName = "Separator";

export { Separator };
