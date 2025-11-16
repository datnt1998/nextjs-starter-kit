# Modal Component

Component modal (dialog) được xây dựng với Base UI Dialog, hỗ trợ nhiều kích thước và animations mượt mà.

## Tính năng

- ✅ **Base UI Dialog**: Sử dụng Base UI primitives
- ✅ **Multiple Sizes**: sm, md, lg, xl, 2xl, full
- ✅ **Gradient Headers**: Predefined and custom gradient support
- ✅ **Shadow Elevation**: Configurable shadow depths (md, lg, xl, 2xl)
- ✅ **Smooth Animations**: Fade và scale transitions
- ✅ **Backdrop**: Overlay với blur effect
- ✅ **Keyboard Support**: ESC để đóng
- ✅ **Focus Management**: Tự động focus vào modal
- ✅ **Scroll Lock**: Khóa scroll khi modal mở
- ✅ **Dark Mode**: Hỗ trợ chế độ tối
- ✅ **Accessible**: Tuân thủ WCAG guidelines
- ✅ **TypeScript**: Fully typed

## Components

### Modal

Component wrapper chính cho modal.

### ModalTrigger

Button để mở modal (optional - có thể dùng state riêng).

### ModalHeader

Header section chứa title và description.

### ModalTitle

Tiêu đề của modal.

### ModalDescription

Mô tả ngắn gọn về modal.

### ModalBody

Nội dung chính của modal với scroll support.

### ModalFooter

Footer section chứa các action buttons.

### ModalClose

Button để đóng modal (có thể đặt ở bất kỳ đâu).

## Cách sử dụng

### Basic Modal với State

```tsx
import { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
  ModalClose,
} from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>

      <Modal open={open} onOpenChange={setOpen}>
        <ModalClose />
        <ModalHeader>
          <ModalTitle>Modal Title</ModalTitle>
          <ModalDescription>
            This is a description of what this modal does.
          </ModalDescription>
        </ModalHeader>
        <ModalBody>
          <p>Modal content goes here.</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>Confirm</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
```

### Modal với Form

```tsx
<Modal open={open} onOpenChange={setOpen} size="lg">
  <ModalClose />
  <ModalHeader>
    <ModalTitle>Create Account</ModalTitle>
    <ModalDescription>Fill in your details below.</ModalDescription>
  </ModalHeader>
  <ModalBody>
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <Input placeholder="John Doe" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <Input type="email" placeholder="john@example.com" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <Input type="password" placeholder="••••••••" />
      </div>
    </form>
  </ModalBody>
  <ModalFooter>
    <Button variant="outline" onClick={() => setOpen(false)}>
      Cancel
    </Button>
    <Button onClick={handleSubmit}>Create Account</Button>
  </ModalFooter>
</Modal>
```

### Confirmation Dialog

```tsx
<Modal open={open} onOpenChange={setOpen} size="sm">
  <ModalHeader>
    <ModalTitle>Delete Account</ModalTitle>
    <ModalDescription>
      Are you sure? This action cannot be undone.
    </ModalDescription>
  </ModalHeader>
  <ModalFooter>
    <Button variant="outline" onClick={() => setOpen(false)}>
      Cancel
    </Button>
    <Button variant="danger" onClick={handleDelete}>
      Delete
    </Button>
  </ModalFooter>
</Modal>
```

### Modal với Close Button

```tsx
<Modal open={open} onOpenChange={setOpen}>
  <ModalClose />
  <ModalHeader>
    <ModalTitle>Settings</ModalTitle>
    <ModalDescription>Manage your preferences.</ModalDescription>
  </ModalHeader>
  <ModalBody>
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span>Email Notifications</span>
        <input type="checkbox" />
      </div>
      <div className="flex items-center justify-between">
        <span>Push Notifications</span>
        <input type="checkbox" />
      </div>
    </div>
  </ModalBody>
  <ModalFooter>
    <Button onClick={() => setOpen(false)}>Save Changes</Button>
  </ModalFooter>
</Modal>
```

### Full Screen Modal

```tsx
<Modal open={open} onOpenChange={setOpen} size="full">
  <ModalClose />
  <ModalHeader>
    <ModalTitle>Full Screen View</ModalTitle>
  </ModalHeader>
  <ModalBody>
    <p>Content takes up the entire viewport.</p>
  </ModalBody>
</Modal>
```

### Gradient Header Modal

```tsx
<Modal open={open} onOpenChange={setOpen} shadow="xl">
  <ModalClose />
  <ModalHeader gradient="primary">
    <ModalTitle>Premium Feature</ModalTitle>
    <ModalDescription>
      Unlock advanced features with our premium plan
    </ModalDescription>
  </ModalHeader>
  <ModalBody>
    <p>Get access to exclusive features...</p>
  </ModalBody>
  <ModalFooter>
    <Button variant="outline" onClick={() => setOpen(false)}>
      Maybe Later
    </Button>
    <Button onClick={() => setOpen(false)}>Upgrade Now</Button>
  </ModalFooter>
</Modal>
```

### Custom Gradient Header

```tsx
<Modal open={open} onOpenChange={setOpen} shadow="xl">
  <ModalClose />
  <ModalHeader
    customGradient={{
      from: "rgb(236, 72, 153)",
      via: "rgb(168, 85, 247)",
      to: "rgb(59, 130, 246)",
      angle: 90,
    }}
  >
    <ModalTitle>Custom Gradient</ModalTitle>
    <ModalDescription>
      Using custom colors from the theme system
    </ModalDescription>
  </ModalHeader>
  <ModalBody>
    <p>This dialog uses custom gradient colors...</p>
  </ModalBody>
  <ModalFooter>
    <Button onClick={() => setOpen(false)}>Close</Button>
  </ModalFooter>
</Modal>
```

## Props

### Modal Props

| Prop           | Type                                  | Default | Description                      |
| -------------- | ------------------------------------- | ------- | -------------------------------- |
| `open`         | `boolean`                             | -       | Trạng thái mở/đóng của modal     |
| `onOpenChange` | `(open: boolean) => void`             | -       | Callback khi trạng thái thay đổi |
| `size`         | `sm \| md \| lg \| xl \| 2xl \| full` | `md`    | Kích thước modal                 |
| `shadow`       | `md \| lg \| xl \| 2xl`               | `2xl`   | Shadow elevation level           |
| `children`     | `React.ReactNode`                     | -       | Nội dung modal                   |
| `className`    | `string`                              | -       | Custom className                 |

### ModalHeader Props

| Prop             | Type                                                         | Default | Description                              |
| ---------------- | ------------------------------------------------------------ | ------- | ---------------------------------------- |
| `gradient`       | `none \| primary \| secondary \| success \| accent \| hero`  | `none`  | Predefined gradient variant              |
| `customGradient` | `{ from: string, to: string, via?: string, angle?: number }` | -       | Custom gradient colors from theme system |
| `children`       | `React.ReactNode`                                            | -       | Header content                           |
| `className`      | `string`                                                     | -       | Custom className                         |

### Size Options

- `sm`: 384px (24rem)
- `md`: 448px (28rem) - Default
- `lg`: 512px (32rem)
- `xl`: 576px (36rem)
- `2xl`: 672px (42rem)
- `full`: Full viewport với padding

### Gradient Options

- `none`: No gradient (default)
- `primary`: Blue to purple gradient
- `secondary`: Purple to pink gradient
- `success`: Green to teal gradient
- `accent`: Orange to red gradient
- `hero`: Multi-stop vibrant gradient
- `customGradient`: Custom colors from theme system

### Shadow Options

- `md`: Medium elevation
- `lg`: Large elevation
- `xl`: Extra large elevation
- `2xl`: Maximum elevation (default)

## Keyboard Shortcuts

- `Escape`: Đóng modal
- `Tab`: Di chuyển focus trong modal
- `Shift + Tab`: Di chuyển focus ngược lại

## Accessibility

Component tuân thủ WCAG guidelines:

- Proper ARIA attributes (`role="dialog"`, `aria-modal="true"`)
- Focus trap trong modal
- Focus restoration khi đóng
- Keyboard navigation
- Screen reader support
- Backdrop click để đóng

## Animations

Modal sử dụng CSS transitions với:

- **Backdrop**: Fade in/out (200ms)
- **Content**: Scale + fade (200ms)
- **Starting style**: Scale 90%, opacity 0
- **Ending style**: Scale 90%, opacity 0

## Best Practices

1. **Sử dụng ModalClose**: Luôn cung cấp cách đóng modal rõ ràng
2. **Size phù hợp**: Chọn size phù hợp với nội dung
3. **Focus management**: Đảm bảo focus vào element quan trọng
4. **Loading states**: Hiển thị loading khi submit form
5. **Error handling**: Xử lý lỗi trong modal
6. **Confirmation**: Sử dụng confirmation dialog cho actions nguy hiểm

## Examples

### Loading State

```tsx
<Modal open={open} onOpenChange={setOpen}>
  <ModalHeader>
    <ModalTitle>Processing</ModalTitle>
  </ModalHeader>
  <ModalBody>
    <div className="flex items-center justify-center py-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
    </div>
  </ModalBody>
</Modal>
```

### Multi-step Form

```tsx
const [step, setStep] = useState(1);

<Modal open={open} onOpenChange={setOpen} size="lg">
  <ModalHeader>
    <ModalTitle>Step {step} of 3</ModalTitle>
  </ModalHeader>
  <ModalBody>
    {step === 1 && <Step1Form />}
    {step === 2 && <Step2Form />}
    {step === 3 && <Step3Form />}
  </ModalBody>
  <ModalFooter>
    {step > 1 && (
      <Button variant="outline" onClick={() => setStep(step - 1)}>
        Back
      </Button>
    )}
    {step < 3 ? (
      <Button onClick={() => setStep(step + 1)}>Next</Button>
    ) : (
      <Button onClick={handleSubmit}>Submit</Button>
    )}
  </ModalFooter>
</Modal>;
```

## Styling

Modal sử dụng Tailwind CSS với:

- Neutral colors cho background và borders
- Primary colors cho focus states
- Dark mode support với `dark:` variants
- Smooth transitions
- Responsive sizing

## Dependencies

- `@base-ui-components/react` - Dialog primitives
- `class-variance-authority` - Variant management
- `tailwind-merge` - Class merging
