import type { Meta, StoryObj } from "@storybook/react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
  useFormWithSchema,
} from "./form";
import { Button } from "../button";
import { Input } from "../input";
import { z } from "zod";

const meta: Meta<typeof Form> = {
  title: "UI/Form",
  component: Form,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Form>;

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    country: z.string().min(1, "Please select a country"),
    terms: z
      .boolean()
      .refine((val) => val === true, "You must accept the terms"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const profileSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  bio: z.string().max(200, "Bio must be less than 200 characters").optional(),
  website: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
});

export const LoginForm: Story = {
  render: () => {
    const form = useFormWithSchema({
      schema: loginSchema,
      defaultValues: {
        email: "",
        password: "",
      },
    });

    return (
      <div className="max-w-md">
        <Form
          form={form}
          onSubmit={(data) => {
            console.log("Login data:", data);
            alert("Form submitted! Check console for data.");
          }}
        >
          <div className="space-y-4">
            <FormField name="email">
              {(field) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    {...field}
                    variant={form.formState.errors.email ? "error" : "default"}
                    error={form.formState.errors.email?.message}
                  />
                </FormItem>
              )}
            </FormField>

            <FormField name="password">
              {(field) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    {...field}
                    variant={
                      form.formState.errors.password ? "error" : "default"
                    }
                    error={form.formState.errors.password?.message}
                  />
                </FormItem>
              )}
            </FormField>

            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </div>
        </Form>
      </div>
    );
  },
};

export const SignupForm: Story = {
  render: () => {
    const form = useFormWithSchema({
      schema: signupSchema,
      defaultValues: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        country: "",
        terms: false,
      },
    });

    return (
      <div className="max-w-md">
        <Form
          form={form}
          onSubmit={(data) => {
            console.log("Signup data:", data);
            alert("Form submitted! Check console for data.");
          }}
        >
          <div className="space-y-4">
            <FormField name="name">
              {(field) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    placeholder="John Doe"
                    {...field}
                    variant={form.formState.errors.name ? "error" : "default"}
                    error={form.formState.errors.name?.message}
                  />
                </FormItem>
              )}
            </FormField>

            <FormField name="email">
              {(field) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    {...field}
                    variant={form.formState.errors.email ? "error" : "default"}
                    error={form.formState.errors.email?.message}
                  />
                </FormItem>
              )}
            </FormField>

            <FormField name="password">
              {(field) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormDescription>
                    Must be at least 8 characters
                  </FormDescription>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    {...field}
                    variant={
                      form.formState.errors.password ? "error" : "default"
                    }
                    error={form.formState.errors.password?.message}
                  />
                </FormItem>
              )}
            </FormField>

            <FormField name="confirmPassword">
              {(field) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    {...field}
                    variant={
                      form.formState.errors.confirmPassword
                        ? "error"
                        : "default"
                    }
                    error={form.formState.errors.confirmPassword?.message}
                  />
                </FormItem>
              )}
            </FormField>

            <FormField name="country">
              {(field) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <select
                    {...field}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="">Select a country</option>
                    <option value="us">United States</option>
                    <option value="uk">United Kingdom</option>
                    <option value="ca">Canada</option>
                  </select>
                  {form.formState.errors.country && (
                    <FormMessage>
                      {form.formState.errors.country.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            </FormField>

            <FormField name="terms">
              {(field) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      ref={field.ref}
                      className="w-4 h-4"
                    />
                    <FormLabel className="mb-0!">
                      I accept the terms and conditions
                    </FormLabel>
                  </div>
                  {form.formState.errors.terms && (
                    <FormMessage>
                      {form.formState.errors.terms.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            </FormField>

            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </Form>
      </div>
    );
  },
};

export const ProfileForm: Story = {
  render: () => {
    const form = useFormWithSchema({
      schema: profileSchema,
      defaultValues: {
        username: "johndoe",
        bio: "",
        website: "",
      },
    });

    return (
      <div className="max-w-md">
        <Form
          form={form}
          onSubmit={(data) => {
            console.log("Profile data:", data);
            alert("Form submitted! Check console for data.");
          }}
        >
          <div className="space-y-4">
            <FormField name="username">
              {(field) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormDescription>
                    This is your public display name
                  </FormDescription>
                  <Input
                    placeholder="johndoe"
                    {...field}
                    variant={
                      form.formState.errors.username ? "error" : "default"
                    }
                    error={form.formState.errors.username?.message}
                  />
                </FormItem>
              )}
            </FormField>

            <FormField name="bio">
              {(field) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormDescription>
                    Brief description about yourself (max 200 characters)
                  </FormDescription>
                  <textarea
                    {...field}
                    value={field.value || ""}
                    className="w-full px-3 py-2 border rounded-md min-h-[100px]"
                    placeholder="Tell us about yourself..."
                  />
                  {form.formState.errors.bio && (
                    <FormMessage>
                      {form.formState.errors.bio.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            </FormField>

            <FormField name="website">
              {(field) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormDescription>
                    Your personal website or portfolio (optional)
                  </FormDescription>
                  <Input
                    type="url"
                    placeholder="https://example.com"
                    {...field}
                    value={field.value || ""}
                    variant={
                      form.formState.errors.website ? "error" : "default"
                    }
                    error={form.formState.errors.website?.message}
                  />
                </FormItem>
              )}
            </FormField>

            <div className="flex gap-2">
              <Button type="submit">Save Changes</Button>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </div>
          </div>
        </Form>
      </div>
    );
  },
};

export const WithValidationErrors: Story = {
  render: () => {
    const form = useFormWithSchema({
      schema: loginSchema,
      defaultValues: {
        email: "invalid-email",
        password: "123",
      },
    });

    return (
      <div className="max-w-md">
        <Form form={form} onSubmit={(data) => console.log(data)}>
          <div className="space-y-4">
            <FormField name="email">
              {(field) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    {...field}
                    variant={form.formState.errors.email ? "error" : "default"}
                    error={form.formState.errors.email?.message}
                  />
                </FormItem>
              )}
            </FormField>

            <FormField name="password">
              {(field) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    {...field}
                    variant={
                      form.formState.errors.password ? "error" : "default"
                    }
                    error={form.formState.errors.password?.message}
                  />
                </FormItem>
              )}
            </FormField>

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    );
  },
};
