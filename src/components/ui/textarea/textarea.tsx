"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { textareaVariants, type TextareaVariants } from "./textarea.variants";

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
    TextareaVariants {
  /**
   * Label text for the textarea
   */
  label?: string;
  /**
   * Helper text to display below the textarea
   */
  helperText?: string;
  /**
   * Error message to display below the textarea
   */
  error?: string;
  /**
   * Maximum character count
   */
  maxLength?: number;
  /**
   * Whether to show character count
   */
  showCount?: boolean;
  /**
   * Whether to auto-resize the textarea based on content
   */
  autoResize?: boolean;
  /**
   * Additional className for the wrapper div
   */
  wrapperClassName?: string;
}

/**
 * A flexible, accessible textarea component with auto-resize and character count.
 *
 * Styled with Tailwind CSS to match the Input component. Supports multiple
 * visual variants, sizes, auto-resize functionality, and character count display.
 * Fully accessible with proper ARIA attributes.
 *
 * @component
 *
 * @example
 * // Basic usage
 * <Textarea label="Description" placeholder="Enter description..." />
 *
 * @example
 * // With character count
 * <Textarea
 *   label="Bio"
 *   maxLength={200}
 *   showCount
 *   placeholder="Tell us about yourself..."
 * />
 *
 * @example
 * // With auto-resize
 * <Textarea
 *   label="Comments"
 *   autoResize
 *   placeholder="Enter your comments..."
 * />
 *
 * @example
 * // With error state
 * <Textarea
 *   label="Message"
 *   error="Message is required"
 *   variant="error"
 * />
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant,
      size,
      resize = "vertical",
      label,
      helperText,
      error,
      maxLength,
      showCount = false,
      autoResize = false,
      wrapperClassName,
      id,
      disabled,
      required,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const textareaId = id || React.useId();
    const helperTextId = `${textareaId}-helper`;
    const errorId = `${textareaId}-error`;
    const hasError = !!error;
    const finalVariant = hasError ? "error" : variant;

    const [charCount, setCharCount] = React.useState(0);
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

    // Handle auto-resize
    React.useEffect(() => {
      if (autoResize && textareaRef.current) {
        const textarea = textareaRef.current;
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }, [value, autoResize]);

    // Handle character count
    React.useEffect(() => {
      if (showCount && value !== undefined) {
        setCharCount(String(value).length);
      }
    }, [value, showCount]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (showCount) {
        setCharCount(e.target.value.length);
      }
      if (autoResize && textareaRef.current) {
        const textarea = textareaRef.current;
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
      onChange?.(e);
    };

    const setRefs = React.useCallback(
      (node: HTMLTextAreaElement | null) => {
        textareaRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    return (
      <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
        {label && (
          <label
            htmlFor={textareaId}
            className={cn(
              "text-sm font-medium text-neutral-900",
              disabled && "opacity-50"
            )}
          >
            {label}
            {required && (
              <span className="ml-1 text-error-600" aria-label="required">
                *
              </span>
            )}
          </label>
        )}
        <textarea
          ref={setRefs}
          id={textareaId}
          className={cn(
            textareaVariants({
              variant: finalVariant,
              size,
              resize: autoResize ? "none" : resize,
            }),
            className
          )}
          disabled={disabled}
          required={required}
          maxLength={maxLength}
          value={value}
          onChange={handleChange}
          aria-invalid={hasError}
          aria-describedby={
            hasError ? errorId : helperText ? helperTextId : undefined
          }
          {...props}
        />
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1">
            {helperText && !hasError && (
              <p
                id={helperTextId}
                className={cn(
                  "text-sm text-neutral-600",
                  disabled && "opacity-50"
                )}
              >
                {helperText}
              </p>
            )}
            {hasError && (
              <p
                id={errorId}
                className="text-sm text-error-600"
                role="alert"
                aria-live="polite"
              >
                {error}
              </p>
            )}
          </div>
          {showCount && maxLength && (
            <p
              className={cn(
                "text-sm",
                charCount > maxLength ? "text-error-600" : "text-neutral-500",
                disabled && "opacity-50"
              )}
            >
              {charCount}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
