# Alert Component

A flexible and modern alert component with support for multiple variants, gradient backgrounds, badges, and dismissible functionality.

## Features

- 🎨 **Multiple Variants**: Default, info, success, warning, error, and gradient styles
- 🌈 **Gradient Backgrounds**: Beautiful gradient options (primary, secondary, success, accent, hero)
- 🏷️ **Badge Support**: Optional badge/label in top-right corner
- ❌ **Dismissible**: Optional close button with smooth animations
- 🎯 **Icons**: Automatic icons for each variant or custom icon support
- ♿ **Accessible**: Proper ARIA roles and keyboard navigation
- 🎭 **Theme Support**: Works seamlessly with light and dark modes

## Installation

The Alert component is part of the UI component library. Make sure you have the required dependencies:

```bash
npm install class-variance-authority
```

## Basic Usage

```tsx
import { Alert } from "@/components/ui/alert";

export function Example() {
  return <Alert variant="info">This is an informational message.</Alert>;
}
```

## Variants

### Standard Variants

```tsx
// Default
<Alert variant="default">
  Default alert message
</Alert>

// Info
<Alert variant="info" title="Information">
  This is an informational message.
</Alert>

// Success
<Alert variant="success" title="Success">
  Your changes have been saved successfully.
</Alert>

// Warning
<Alert variant="warning" title="Warning">
  Please review this information before proceeding.
</Alert>

// Error
<Alert variant="error" title="Error">
  An error occurred while processing your request.
</Alert>
```

### Gradient Variants

```tsx
// Primary Gradient
<Alert
  variant="gradient"
  gradient="primary"
  title="Public Search Mode"
  badge="0 left"
  dismissible
>
  You're seeing estimated ride fares. Connect your accounts for personalized pricing!
</Alert>

// Success Gradient
<Alert
  variant="gradient"
  gradient="success"
  title="Deployment Successful"
  badge="Live"
>
  Your application has been deployed to production successfully.
</Alert>

// Accent Gradient
<Alert
  variant="gradient"
  gradient="accent"
  title="Limited Time Offer"
  badge="Hot"
>
  Get 50% off on annual plans. Offer expires in 24 hours!
</Alert>

// Hero Gradient (multi-color)
<Alert
  variant="gradient"
  gradient="hero"
  title="Welcome"
  badge="New"
>
  Discover powerful features and tools to boost your productivity.
</Alert>
```

## Props

| Prop          | Type                                                                     | Default     | Description                                        |
| ------------- | ------------------------------------------------------------------------ | ----------- | -------------------------------------------------- |
| `variant`     | `"default" \| "info" \| "success" \| "warning" \| "error" \| "gradient"` | `"default"` | Visual style variant                               |
| `gradient`    | `"primary" \| "secondary" \| "success" \| "accent" \| "hero"`            | -           | Gradient type (only for gradient variant)          |
| `title`       | `string`                                                                 | -           | Title text for the alert                           |
| `badge`       | `string`                                                                 | -           | Badge/label text in top-right corner               |
| `icon`        | `ReactNode`                                                              | Auto        | Custom icon (auto-generated for standard variants) |
| `dismissible` | `boolean`                                                                | `false`     | Whether the alert can be dismissed                 |
| `onDismiss`   | `() => void`                                                             | -           | Callback when alert is dismissed                   |
| `className`   | `string`                                                                 | -           | Additional CSS classes                             |
| `children`    | `ReactNode`                                                              | -           | Alert content/description                          |

## Examples

### With Title and Badge

```tsx
<Alert variant="info" title="New Feature" badge="Beta">
  Check out our new beta feature!
</Alert>
```

### Dismissible Alert

```tsx
<Alert
  variant="warning"
  title="Warning"
  dismissible
  onDismiss={() => console.log("Alert dismissed")}
>
  This alert can be closed by clicking the X button.
</Alert>
```

### Custom Icon

```tsx
<Alert variant="info" title="Custom Icon" icon={<YourCustomIcon />}>
  Alert with a custom icon instead of the default one.
</Alert>
```

### No Icon

```tsx
<Alert variant="gradient" gradient="primary" icon={null} dismissible>
  ✨ Simple gradient alert without an icon.
</Alert>
```

### Real-World Examples

```tsx
// Connection Status
<Alert
  variant="gradient"
  gradient="primary"
  title="Public Search Mode"
  badge="0 left"
  dismissible
>
  You're seeing estimated ride fares. Connect your accounts for personalized
  pricing from your apps!
</Alert>

// Payment Success
<Alert
  variant="success"
  title="Payment Successful"
  dismissible
>
  Your payment of $49.99 has been processed successfully. Receipt sent to your email.
</Alert>

// Storage Warning
<Alert
  variant="warning"
  title="Storage Almost Full"
  badge="85%"
>
  You're using 85% of your storage. Consider upgrading your plan or deleting unused files.
</Alert>

// Error Message
<Alert
  variant="error"
  title="Connection Failed"
  dismissible
>
  Unable to connect to the server. Please check your internet connection and try again.
</Alert>

// Promotional Alert
<Alert
  variant="gradient"
  gradient="accent"
  title="Flash Sale"
  badge="24h"
  dismissible
>
  🔥 Limited time offer! Get 50% off on all premium plans. Hurry, offer ends in 24 hours!
</Alert>
```

## Styling

The Alert component uses Tailwind CSS and CVA (Class Variance Authority) for styling. You can customize the appearance by:

1. **Using className prop**: Add additional Tailwind classes
2. **Modifying variants**: Edit `alert.variants.ts` to change default styles
3. **Theme variables**: Adjust color scales in your theme configuration

### Custom Styling Example

```tsx
<Alert variant="gradient" gradient="primary" className="max-w-2xl mx-auto">
  Centered alert with custom max-width
</Alert>
```

## Accessibility

The Alert component follows accessibility best practices:

- Uses `role="alert"` for screen readers
- Dismissible alerts have proper `aria-label` on close button
- Keyboard navigation support (Tab, Enter, Escape)
- Focus management for interactive elements
- Sufficient color contrast for all variants

## Gradient Colors

The gradient variants use the following color combinations:

- **Primary**: Blue to Purple (`primary-500` → `secondary-600`)
- **Secondary**: Purple to Pink (`secondary-500` → `primary-600`)
- **Success**: Green to Teal (`success-500` → `primary-600`)
- **Accent**: Orange to Red (`accent-500` → `error-500`)
- **Hero**: Blue → Purple → Pink (multi-stop gradient)

## Best Practices

1. **Use appropriate variants**: Match the alert variant to the message type
2. **Keep messages concise**: Alert content should be brief and actionable
3. **Use titles wisely**: Titles help users quickly understand the alert purpose
4. **Badge for context**: Use badges to show status, count, or urgency
5. **Dismissible for non-critical**: Allow users to dismiss informational alerts
6. **Gradient for emphasis**: Use gradient variants for important announcements

## Storybook

View all Alert variants and examples in Storybook:

```bash
npm run storybook
```

Navigate to **UI > Alert** to see interactive examples.

## Related Components

- **Badge**: Used internally for the badge prop
- **Button**: Similar gradient styling options
- **Card**: Alternative container for content
- **Dialog**: For modal alerts requiring user action

## Migration from v1

If you're upgrading from a previous version:

```tsx
// Old (v1)
<Alert type="info">Message</Alert>

// New (v2)
<Alert variant="info">Message</Alert>

// New gradient feature
<Alert variant="gradient" gradient="primary" badge="New">
  Message
</Alert>
```

## Troubleshooting

### Gradient not showing

Make sure you're using both `variant="gradient"` and the `gradient` prop:

```tsx
<Alert variant="gradient" gradient="primary">
  Content
</Alert>
```

### Badge not visible

Ensure you have a `title` prop when using `badge`:

```tsx
<Alert title="Title" badge="Badge">
  Content
</Alert>
```

### Icon not appearing

Standard variants (info, success, warning, error) have automatic icons. For gradient or default variants, provide a custom icon or set `icon={null}` to hide it.

## License

MIT
