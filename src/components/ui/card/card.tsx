"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  cardVariants,
  cardHeaderVariants,
  cardTitleVariants,
  cardDescriptionVariants,
  cardContentVariants,
  cardFooterVariants,
  type CardVariants,
  type CardHeaderVariants,
  type CardContentVariants,
  type CardFooterVariants,
} from "./card.variants";

/**
 * Props for the Card component.
 */
export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    CardVariants {}

/**
 * A flexible card container component with multiple variants.
 *
 * Styled with Tailwind CSS using CVA for variants. Supports
 * different visual styles, padding options, and composable sub-components.
 *
 * @component
 *
 * @example
 * // Basic usage
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *     <CardDescription>Card description goes here</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Card content</p>
 *   </CardContent>
 *   <CardFooter>
 *     <Button>Action</Button>
 *   </CardFooter>
 * </Card>
 *
 * @example
 * // Elevated card with custom padding
 * <Card variant="elevated" padding="lg">
 *   <CardTitle>Featured Content</CardTitle>
 * </Card>
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, padding }), className)}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

/**
 * Props for the CardHeader component.
 */
export interface CardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    CardHeaderVariants {}

/**
 * Header section of a card, typically containing title and description.
 */
export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, padding, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardHeaderVariants({ padding }), className)}
        {...props}
      />
    );
  }
);

CardHeader.displayName = "CardHeader";

/**
 * Props for the CardTitle component.
 */
export interface CardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

/**
 * Title element for a card header.
 */
export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <h3 ref={ref} className={cn(cardTitleVariants(), className)} {...props} />
    );
  }
);

CardTitle.displayName = "CardTitle";

/**
 * Props for the CardDescription component.
 */
export interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

/**
 * Description element for a card header.
 */
export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(cardDescriptionVariants(), className)}
      {...props}
    />
  );
});

CardDescription.displayName = "CardDescription";

/**
 * Props for the CardContent component.
 */
export interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    CardContentVariants {}

/**
 * Main content area of a card.
 */
export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, padding, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardContentVariants({ padding }), className)}
        {...props}
      />
    );
  }
);

CardContent.displayName = "CardContent";

/**
 * Props for the CardFooter component.
 */
export interface CardFooterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    CardFooterVariants {}

/**
 * Footer section of a card, typically containing actions.
 */
export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, padding, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardFooterVariants({ padding }), className)}
        {...props}
      />
    );
  }
);

CardFooter.displayName = "CardFooter";
