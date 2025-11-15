"use client";

import * as React from "react";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
  useFormWithSchema,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";

/**
 * Example form schema with various validation rules
 */
const exampleFormSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must not exceed 20 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  age: z
    .string()
    .min(1, "Age is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Age must be a positive number",
    })
    .refine((val) => Number(val) >= 18, {
      message: "You must be at least 18 years old",
    }),
  country: z.string().min(1, "Please select a country"),
  bio: z.string().max(500, "Bio must not exceed 500 characters").optional(),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

type ExampleFormData = z.infer<typeof exampleFormSchema>;

const countryOptions = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
  { value: "other", label: "Other" },
];

export default function FormDemoPage() {
  const [submittedData, setSubmittedData] =
    React.useState<ExampleFormData | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useFormWithSchema<ExampleFormData>({
    schema: exampleFormSchema,
    defaultValues: {
      username: "",
      email: "",
      age: "",
      country: "",
      bio: "",
      terms: false,
    } as ExampleFormData,
    mode: "onBlur",
  });

  const onSubmit = async (data: ExampleFormData) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSubmittedData(data);
    setIsSubmitting(false);

    // Reset form after successful submission
    form.reset();
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
            Form Demo
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mb-8">
            Example form demonstrating React Hook Form integration with Zod
            validation
          </p>

          <Form form={form} onSubmit={onSubmit} className="space-y-6">
            {/* Username Field */}
            <FormField name="username" control={form.control}>
              {(field) => (
                <FormItem>
                  <FormLabel required>Username</FormLabel>
                  <Input
                    {...field}
                    placeholder="Enter your username"
                    error={form.formState.errors.username?.message}
                  />
                  <FormDescription>
                    Choose a unique username (3-20 characters, letters, numbers,
                    and underscores only)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            </FormField>

            {/* Email Field */}
            <FormField name="email" control={form.control}>
              {(field) => (
                <FormItem>
                  <FormLabel required>Email</FormLabel>
                  <Input
                    {...field}
                    type="email"
                    placeholder="your.email@example.com"
                    error={form.formState.errors.email?.message}
                  />
                  <FormDescription>
                    We'll never share your email with anyone else
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            </FormField>

            {/* Age Field */}
            <FormField name="age" control={form.control}>
              {(field) => (
                <FormItem>
                  <FormLabel required>Age</FormLabel>
                  <Input
                    {...field}
                    type="number"
                    placeholder="Enter your age"
                    error={form.formState.errors.age?.message}
                  />
                  <FormDescription>
                    You must be at least 18 years old
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            </FormField>

            {/* Country Field */}
            <FormField name="country" control={form.control}>
              {(field) => (
                <FormItem>
                  <FormLabel required>Country</FormLabel>
                  <Select
                    {...field}
                    options={countryOptions}
                    placeholder="Select your country"
                    error={form.formState.errors.country?.message}
                  />
                  <FormDescription>
                    Select the country you currently reside in
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            </FormField>

            {/* Bio Field (Optional) */}
            <FormField name="bio" control={form.control}>
              {(field) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <textarea
                    {...field}
                    rows={4}
                    placeholder="Tell us about yourself (optional)"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      form.formState.errors.bio
                        ? "border-error-600 focus:ring-error-600"
                        : "border-neutral-300 dark:border-neutral-600 focus:ring-primary-600"
                    } bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white`}
                  />
                  <FormDescription>Maximum 500 characters</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            </FormField>

            {/* Terms Checkbox */}
            <FormField name="terms" control={form.control}>
              {(field) => (
                <FormItem>
                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className="mt-1 h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-600"
                    />
                    <div className="flex-1">
                      <FormLabel
                        htmlFor="terms"
                        required
                        className="cursor-pointer"
                      >
                        I accept the terms and conditions
                      </FormLabel>
                      <FormDescription>
                        You must agree to our terms and conditions to continue
                      </FormDescription>
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            </FormField>

            {/* Submit Button */}
            <div className="flex gap-4">
              <Button
                type="submit"
                variant="primary"
                isLoading={isSubmitting}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Form"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                disabled={isSubmitting}
              >
                Reset
              </Button>
            </div>
          </Form>

          {/* Display Submitted Data */}
          {submittedData && (
            <div className="mt-8 p-6 bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800 rounded-lg">
              <h2 className="text-xl font-semibold text-success-900 dark:text-success-100 mb-4">
                Form Submitted Successfully! ✓
              </h2>
              <div className="space-y-2 text-sm">
                <p className="text-neutral-700 dark:text-neutral-300">
                  <strong>Username:</strong> {submittedData.username}
                </p>
                <p className="text-neutral-700 dark:text-neutral-300">
                  <strong>Email:</strong> {submittedData.email}
                </p>
                <p className="text-neutral-700 dark:text-neutral-300">
                  <strong>Age:</strong> {submittedData.age}
                </p>
                <p className="text-neutral-700 dark:text-neutral-300">
                  <strong>Country:</strong>{" "}
                  {
                    countryOptions.find(
                      (c) => c.value === submittedData.country
                    )?.label
                  }
                </p>
                {submittedData.bio && (
                  <p className="text-neutral-700 dark:text-neutral-300">
                    <strong>Bio:</strong> {submittedData.bio}
                  </p>
                )}
                <p className="text-neutral-700 dark:text-neutral-300">
                  <strong>Terms Accepted:</strong>{" "}
                  {submittedData.terms ? "Yes" : "No"}
                </p>
              </div>
            </div>
          )}

          {/* Form State Debug Info */}
          <div className="mt-8 p-4 bg-neutral-100 dark:bg-neutral-700 rounded-lg">
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-2">
              Form State (Debug)
            </h3>
            <div className="text-xs space-y-1 text-neutral-600 dark:text-neutral-400">
              <p>
                <strong>Is Valid:</strong>{" "}
                {form.formState.isValid ? "Yes" : "No"}
              </p>
              <p>
                <strong>Is Dirty:</strong>{" "}
                {form.formState.isDirty ? "Yes" : "No"}
              </p>
              <p>
                <strong>Is Submitting:</strong>{" "}
                {form.formState.isSubmitting ? "Yes" : "No"}
              </p>
              <p>
                <strong>Error Count:</strong>{" "}
                {Object.keys(form.formState.errors).length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
