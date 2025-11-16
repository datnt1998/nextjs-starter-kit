"use client";

import * as React from "react";
import {
  useForm,
  FormProvider,
  useFormContext,
  Controller,
  type UseFormReturn,
  type FieldValues,
  type SubmitHandler,
  type ControllerProps,
  type FieldPath,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

// Type helper for Zod resolver compatibility
type ZodSchema<T> = z.ZodType<T, any, any>;

/**
 * Form component that wraps React Hook Form's FormProvider
 * Provides form context to all child components
 */
interface FormProps<TFormValues extends FieldValues>
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  form: UseFormReturn<TFormValues>;
  onSubmit: SubmitHandler<TFormValues>;
  children: React.ReactNode;
}

function Form<TFormValues extends FieldValues>({
  form,
  onSubmit,
  children,
  ...props
}: FormProps<TFormValues>) {
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} {...props}>
        {children}
      </form>
    </FormProvider>
  );
}

/**
 * Hook to create a form with Zod schema validation
 */
interface UseFormWithSchemaOptions<TFormValues extends FieldValues> {
  schema: ZodSchema<TFormValues>;
  defaultValues?: TFormValues;
  mode?: "onBlur" | "onChange" | "onSubmit" | "onTouched" | "all";
}

function useFormWithSchema<TFormValues extends FieldValues = FieldValues>({
  schema,
  defaultValues,
  mode = "onBlur",
}: UseFormWithSchemaOptions<TFormValues>) {
  return useForm<TFormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as any,
    mode,
  });
}

/**
 * FormField component for composing form fields with validation
 */
interface FormFieldContextValue<
  TFormValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFormValues> = FieldPath<TFormValues>,
> {
  name: TName;
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

interface FormFieldProps<
  TFormValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFormValues> = FieldPath<TFormValues>,
> extends Omit<ControllerProps<TFormValues, TName>, "render"> {
  children: (field: {
    value: any;
    onChange: (...event: any[]) => void;
    onBlur: () => void;
    name: TName;
    ref: React.Ref<any>;
  }) => React.ReactElement;
}

function FormField<
  TFormValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFormValues> = FieldPath<TFormValues>,
>({ name, children, ...props }: FormFieldProps<TFormValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name }}>
      <Controller
        name={name}
        {...props}
        render={({ field }) => children(field)}
      />
    </FormFieldContext.Provider>
  );
}

/**
 * Hook to access the current form field context
 */
function useFormField() {
  const fieldContext = React.useContext(FormFieldContext);
  const formContext = useFormContext();

  if (!fieldContext) {
    throw new Error("useFormField must be used within a FormField");
  }

  const { name } = fieldContext;
  const fieldState = formContext.getFieldState(name, formContext.formState);

  return {
    name,
    id: name,
    ...fieldState,
  };
}

/**
 * FormItem component - wrapper for form field items
 */
interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <div ref={ref} className={`space-y-2 ${className}`} {...props}>
        {children}
      </div>
    );
  }
);
FormItem.displayName = "FormItem";

/**
 * FormLabel component - label for form fields
 */
interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className = "", required, children, ...props }, ref) => {
    const { error, name } = useFormField();

    return (
      <label
        ref={ref}
        htmlFor={name}
        className={`block text-sm font-medium ${
          error ? "text-destructive" : "text-foreground"
        } ${className}`}
        {...props}
      >
        {children}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
    );
  }
);
FormLabel.displayName = "FormLabel";

/**
 * FormDescription component - helper text for form fields
 */
interface FormDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  FormDescriptionProps
>(({ className = "", ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={`text-sm text-muted-foreground ${className}`}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

/**
 * FormMessage component - displays validation error messages
 */
interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const FormMessage = React.forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ className = "", children, ...props }, ref) => {
    const { error } = useFormField();
    const body = error ? String(error?.message) : children;

    if (!body) {
      return null;
    }

    return (
      <p
        ref={ref}
        className={`text-sm font-medium text-destructive ${className}`}
        {...props}
      >
        {body}
      </p>
    );
  }
);
FormMessage.displayName = "FormMessage";

/**
 * FormControl component - wrapper for form control elements
 * Automatically passes error state and other props to child input
 */
interface FormControlProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactElement;
}

const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>(
  ({ children, ...props }, ref) => {
    const { error, name } = useFormField();

    return (
      <div ref={ref} {...props}>
        {React.cloneElement(children, {
          id: name,
          "aria-invalid": !!error,
          "aria-describedby": error ? `${name}-error` : undefined,
          error: error?.message,
          ...children.props,
        })}
      </div>
    );
  }
);
FormControl.displayName = "FormControl";

// Export React Hook Form components (for existing code compatibility)
export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
  FormControl,
  useFormWithSchema,
  useFormField,
};
