# Toast Component

Toast component được xây dựng trên Base UI Toast với hỗ trợ nhiều variants và Promise Toast.

## Cài đặt

Wrap ứng dụng của bạn với `ToastProvider`:

```tsx
import { ToastProvider } from "@/components/ui/toast";

function App() {
  return (
    <ToastProvider>
      <YourApp />
    </ToastProvider>
  );
}
```

## Sử dụng cơ bản

```tsx
import { useToast } from "@/components/ui/toast";

function MyComponent() {
  const toast = useToast();

  return (
    <button
      onClick={() =>
        toast.success({
          title: "Success!",
          description: "Your changes have been saved.",
        })
      }
    >
      Save
    </button>
  );
}
```

## Variants

Toast hỗ trợ 5 variants:

### Default

```tsx
toast.show({
  title: "Default Toast",
  description: "This is a default notification.",
});
```

### Info

```tsx
toast.info({
  title: "Info",
  description: "This is an informational message.",
});
```

### Success

```tsx
toast.success({
  title: "Success!",
  description: "Operation completed successfully.",
});
```

### Warning

```tsx
toast.warning({
  title: "Warning",
  description: "Please review your input.",
});
```

### Error

```tsx
toast.error({
  title: "Error",
  description: "Something went wrong.",
});
```

## Promise Toast

Promise Toast tự động hiển thị loading, success, hoặc error states dựa trên Promise:

### Cơ bản

```tsx
toast.promise(fetchData(), {
  loading: "Loading data...",
  success: "Data loaded successfully!",
  error: "Failed to load data",
});
```

### Với dynamic messages

```tsx
toast.promise(saveUser(userData), {
  loading: "Saving user...",
  success: (user) => `User ${user.name} saved successfully!`,
  error: (err) => `Error: ${err.message}`,
});
```

### Với descriptions

```tsx
toast.promise(uploadFile(file), {
  loading: {
    title: "Uploading file...",
    description: "Please wait while we upload your file",
  },
  success: {
    title: "Upload complete!",
    description: "Your file has been uploaded successfully",
  },
  error: {
    title: "Upload failed",
    description: "Unable to upload your file. Please try again.",
  },
});
```

## Vị trí Toast

Bạn có thể thay đổi vị trí của toast viewport:

```tsx
<ToastProvider position="top-right">
  <App />
</ToastProvider>
```

Các vị trí có sẵn:

- `top-left`
- `top-right`
- `bottom-left`
- `bottom-right` (mặc định)

## Duration

Bạn có thể tùy chỉnh thời gian hiển thị của toast:

```tsx
toast.success({
  title: "Success!",
  description: "This will disappear in 5 seconds",
  duration: 5000, // milliseconds
});
```

## API Reference

### ToastProvider Props

| Prop       | Type                                                           | Default          | Description               |
| ---------- | -------------------------------------------------------------- | ---------------- | ------------------------- |
| `children` | `ReactNode`                                                    | -                | Nội dung của ứng dụng     |
| `position` | `"top-left" \| "top-right" \| "bottom-left" \| "bottom-right"` | `"bottom-right"` | Vị trí của toast viewport |

### useToast() Return Value

| Method    | Type                                                                        | Description            |
| --------- | --------------------------------------------------------------------------- | ---------------------- |
| `show`    | `(data: ToastData) => void`                                                 | Hiển thị default toast |
| `info`    | `(data: ToastData) => void`                                                 | Hiển thị info toast    |
| `success` | `(data: ToastData) => void`                                                 | Hiển thị success toast |
| `warning` | `(data: ToastData) => void`                                                 | Hiển thị warning toast |
| `error`   | `(data: ToastData) => void`                                                 | Hiển thị error toast   |
| `promise` | `<T>(promise: Promise<T>, messages: PromiseToastMessages<T>) => Promise<T>` | Hiển thị promise toast |

### ToastData

```typescript
interface ToastData {
  title: string;
  description?: string;
  duration?: number;
}
```

### PromiseToastMessages

```typescript
interface PromiseToastMessages<T> {
  loading: string | { title: string; description?: string };
  success:
    | string
    | { title: string; description?: string }
    | ((data: T) => string | { title: string; description?: string });
  error:
    | string
    | { title: string; description?: string }
    | ((error: Error) => string | { title: string; description?: string });
}
```
