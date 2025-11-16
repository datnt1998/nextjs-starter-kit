"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  containerVariants,
  type ContainerVariants,
} from "./container.variants";

/**
 * Props for the Container component.
 */
export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    ContainerVariants {
  /**
   * The HTML element to render as the container.
   * @default "div"
   */
  as?: "div" | "section" | "article" | "main" | "aside" | "header" | "footer";
}

/**
 * A responsive container component for layout management.
 *
 * Provides consistent max-width constraints and horizontal padding
 * across different screen sizes. Supports multiple size variants
 * and can be rendered as different semantic HTML elements.
 *
 * @component
 *
 * @example
 * // Basic usage
 * <Container>
 *   <h1>Page Content</h1>
 * </Container>
 *
 * @example
 * // Different sizes
 * <Container size="sm">Narrow content</Container>
 * <Container size="2xl">Wide content</Container>
 *
 * @example
 * // As semantic element
 * <Container as="main" size="lg">
 *   <h1>Main Content</h1>
 * </Container>
 *
 * @example
 * // Centered content
 * <Container centered>
 *   <div>Centered content</div>
 * </Container>
 */
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (
    { className, size, padding, centered, as: Component = "div", ...props },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          containerVariants({ size, padding, centered }),
          className
        )}
        {...props}
      />
    );
  }
);

Container.displayName = "Container";
