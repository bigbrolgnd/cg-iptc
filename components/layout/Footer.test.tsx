import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
  afterEach(() => {
    cleanup();
  });

  it('[P1] should render the footer element', () => {
    // GIVEN: Footer component
    render(<Footer />);

    // THEN: Footer semantic element is present
    const footer = document.querySelector('footer');
    expect(footer).toBeInTheDocument();
  });

  it('[P1] should display copyright text', () => {
    // GIVEN: Footer component
    render(<Footer />);

    // THEN: Copyright notice is visible
    expect(screen.getByText(/All Rights Reserved/i)).toBeInTheDocument();
    expect(screen.getByText(/Clay-Gilmore Institute/i)).toBeInTheDocument();
  });

  it('[P1] should include the current year in copyright', () => {
    // GIVEN: Footer component
    render(<Footer />);

    // THEN: Current year is present in copyright text (dynamic to avoid time-bomb)
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(String(currentYear)))).toBeInTheDocument();
  });

  it('[P2] should have border top styling', () => {
    // GIVEN: Footer component
    const { container } = render(<Footer />);

    // THEN: Border classes are applied
    const footer = container.querySelector('footer');
    expect(footer?.className).toContain('border-t');
    expect(footer?.className).toContain('border-zinc-100');
  });

  it('[P2] should have white background', () => {
    // GIVEN: Footer component
    const { container } = render(<Footer />);

    // THEN: Background class is applied
    const footer = container.querySelector('footer');
    expect(footer?.className).toContain('bg-white');
  });

  it('[P2] should have centered text', () => {
    // GIVEN: Footer component
    render(<Footer />);

    // THEN: Text has center alignment
    const text = screen.getByText(/All Rights Reserved/i);
    expect(text.className).toContain('text-center');
  });

  it('[P2] should use uppercase styling', () => {
    // GIVEN: Footer component
    render(<Footer />);

    // THEN: Text has uppercase class
    const text = screen.getByText(/All Rights Reserved/i);
    expect(text.className).toContain('uppercase');
  });

  it('[P2] should have proper spacing', () => {
    // GIVEN: Footer component
    const { container } = render(<Footer />);

    // THEN: Padding and margin classes are applied
    const footer = container.querySelector('footer');
    expect(footer?.className).toContain('py-8');
    expect(footer?.className).toContain('mt-auto');
  });

  it('[P2] should constrain content width', () => {
    // GIVEN: Footer component
    const { container } = render(<Footer />);

    // THEN: Max width constraint is applied
    const innerContainer = container.querySelector('.max-w-screen-2xl');
    expect(innerContainer).toBeInTheDocument();
  });
});
