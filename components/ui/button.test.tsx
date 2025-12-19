import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { Button, buttonVariants } from './button';
import { createRef } from 'react';

describe('Button', () => {
  afterEach(() => {
    cleanup();
  });

  describe('rendering', () => {
    it('[P1] should render with default variant and size', () => {
      // GIVEN: Button with no variant specified
      render(<Button>Click me</Button>);

      // THEN: Button is rendered with default styling
      const button = screen.getByRole('button', { name: 'Click me' });
      expect(button).toBeInTheDocument();
      expect(button.className).toContain('bg-primary');
      expect(button.className).toContain('h-9');
    });

    it('[P1] should render children content', () => {
      // GIVEN: Button with text content
      render(<Button>Submit Form</Button>);

      // THEN: Text is visible
      expect(screen.getByText('Submit Form')).toBeInTheDocument();
    });

    it('[P2] should render with icon children', () => {
      // GIVEN: Button with icon element
      render(
        <Button>
          <svg data-testid="icon" />
          <span>With Icon</span>
        </Button>
      );

      // THEN: Both icon and text are rendered
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.getByText('With Icon')).toBeInTheDocument();
    });
  });

  describe('variants', () => {
    it('[P1] should apply destructive variant classes', () => {
      // GIVEN: Button with destructive variant
      render(<Button variant="destructive">Delete</Button>);

      // THEN: Destructive classes are applied
      const button = screen.getByRole('button');
      expect(button.className).toContain('bg-destructive');
    });

    it('[P1] should apply outline variant classes', () => {
      // GIVEN: Button with outline variant
      render(<Button variant="outline">Outline</Button>);

      // THEN: Outline classes are applied
      const button = screen.getByRole('button');
      expect(button.className).toContain('border');
      expect(button.className).toContain('bg-background');
    });

    it('[P1] should apply secondary variant classes', () => {
      // GIVEN: Button with secondary variant
      render(<Button variant="secondary">Secondary</Button>);

      // THEN: Secondary classes are applied
      const button = screen.getByRole('button');
      expect(button.className).toContain('bg-secondary');
    });

    it('[P1] should apply ghost variant classes', () => {
      // GIVEN: Button with ghost variant
      render(<Button variant="ghost">Ghost</Button>);

      // THEN: Ghost classes are applied
      const button = screen.getByRole('button');
      expect(button.className).toContain('hover:bg-accent');
    });

    it('[P1] should apply link variant classes', () => {
      // GIVEN: Button with link variant
      render(<Button variant="link">Link</Button>);

      // THEN: Link classes are applied
      const button = screen.getByRole('button');
      expect(button.className).toContain('underline-offset-4');
    });
  });

  describe('sizes', () => {
    it('[P1] should apply small size classes', () => {
      // GIVEN: Button with sm size
      render(<Button size="sm">Small</Button>);

      // THEN: Small size classes are applied
      const button = screen.getByRole('button');
      expect(button.className).toContain('h-8');
      expect(button.className).toContain('text-xs');
    });

    it('[P1] should apply large size classes', () => {
      // GIVEN: Button with lg size
      render(<Button size="lg">Large</Button>);

      // THEN: Large size classes are applied
      const button = screen.getByRole('button');
      expect(button.className).toContain('h-10');
      expect(button.className).toContain('px-8');
    });

    it('[P1] should apply icon size classes', () => {
      // GIVEN: Button with icon size
      render(<Button size="icon">🔍</Button>);

      // THEN: Icon size classes are applied
      const button = screen.getByRole('button');
      expect(button.className).toContain('h-9');
      expect(button.className).toContain('w-9');
    });
  });

  describe('asChild prop', () => {
    it('[P1] should render as button by default', () => {
      // GIVEN: Button without asChild
      render(<Button>Default</Button>);

      // THEN: Renders as button element
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('[P1] should render child element when asChild is true', () => {
      // GIVEN: Button with asChild and anchor child
      render(
        <Button asChild>
          <a href="/link">Link Button</a>
        </Button>
      );

      // THEN: Renders as anchor element with button styles
      const link = screen.getByRole('link', { name: 'Link Button' });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/link');
      expect(link.className).toContain('inline-flex');
    });
  });

  describe('interactions', () => {
    it('[P1] should handle click events', () => {
      // GIVEN: Button with click handler
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);

      // WHEN: Button is clicked
      fireEvent.click(screen.getByRole('button'));

      // THEN: Handler is called
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('[P1] should support disabled state', () => {
      // GIVEN: Disabled button
      const handleClick = vi.fn();
      render(
        <Button disabled onClick={handleClick}>
          Disabled
        </Button>
      );

      // WHEN: Attempting to click
      fireEvent.click(screen.getByRole('button'));

      // THEN: Handler is not called, button has disabled attribute
      expect(handleClick).not.toHaveBeenCalled();
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  describe('ref forwarding', () => {
    it('[P2] should forward ref to button element', () => {
      // GIVEN: Button with ref
      const ref = createRef<HTMLButtonElement>();
      render(<Button ref={ref}>With Ref</Button>);

      // THEN: Ref points to button element
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current?.textContent).toBe('With Ref');
    });
  });

  describe('custom className', () => {
    it('[P2] should merge custom className with variants', () => {
      // GIVEN: Button with custom className
      render(<Button className="custom-class">Custom</Button>);

      // THEN: Both default and custom classes are present
      const button = screen.getByRole('button');
      expect(button.className).toContain('custom-class');
      expect(button.className).toContain('inline-flex'); // Default class
    });
  });

  describe('buttonVariants utility', () => {
    it('[P2] should generate correct class string', () => {
      // GIVEN: buttonVariants with specific options
      const classes = buttonVariants({ variant: 'outline', size: 'lg' });

      // THEN: Returns combined classes
      expect(classes).toContain('border');
      expect(classes).toContain('h-10');
    });
  });
});
