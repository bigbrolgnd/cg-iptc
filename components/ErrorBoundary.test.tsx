import { describe, it, expect, afterEach, vi, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';

// Component that throws an error for testing
const ThrowingComponent = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>Child rendered successfully</div>;
};

describe('ErrorBoundary', () => {
  // Suppress console.error during error boundary tests
  const originalError = console.error;

  beforeEach(() => {
    console.error = vi.fn();
  });

  afterEach(() => {
    cleanup();
    console.error = originalError;
  });

  it('[P1] should render children when no error occurs', () => {
    // GIVEN: ErrorBoundary with non-throwing child
    render(
      <ErrorBoundary fallback={<div>Error occurred</div>}>
        <ThrowingComponent shouldThrow={false} />
      </ErrorBoundary>
    );

    // THEN: Children are rendered
    expect(screen.getByText('Child rendered successfully')).toBeInTheDocument();
  });

  it('[P0] should render fallback when child throws error', () => {
    // GIVEN: ErrorBoundary with throwing child
    render(
      <ErrorBoundary fallback={<div>Error occurred</div>}>
        <ThrowingComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    // THEN: Fallback is rendered instead of children
    expect(screen.getByText('Error occurred')).toBeInTheDocument();
    expect(screen.queryByText('Child rendered successfully')).not.toBeInTheDocument();
  });

  it('[P1] should render custom fallback content', () => {
    // GIVEN: ErrorBoundary with custom fallback
    const customFallback = (
      <div>
        <h2>Something went wrong</h2>
        <p>Please refresh the page</p>
      </div>
    );

    render(
      <ErrorBoundary fallback={customFallback}>
        <ThrowingComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    // THEN: Custom fallback content is displayed
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Please refresh the page')).toBeInTheDocument();
  });

  it('[P1] should catch errors in nested components', () => {
    // GIVEN: Nested component structure with error in deep child
    const NestedComponent = () => (
      <div>
        <div>
          <ThrowingComponent shouldThrow={true} />
        </div>
      </div>
    );

    render(
      <ErrorBoundary fallback={<div>Caught nested error</div>}>
        <NestedComponent />
      </ErrorBoundary>
    );

    // THEN: Error is caught at boundary level
    expect(screen.getByText('Caught nested error')).toBeInTheDocument();
  });

  it('[P2] should not affect siblings outside the boundary', () => {
    // GIVEN: ErrorBoundary with sibling content
    render(
      <div>
        <div>Sibling content</div>
        <ErrorBoundary fallback={<div>Error fallback</div>}>
          <ThrowingComponent shouldThrow={true} />
        </ErrorBoundary>
      </div>
    );

    // THEN: Sibling content remains visible
    expect(screen.getByText('Sibling content')).toBeInTheDocument();
    expect(screen.getByText('Error fallback')).toBeInTheDocument();
  });
});
