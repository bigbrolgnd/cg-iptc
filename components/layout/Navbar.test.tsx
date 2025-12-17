import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { Navbar } from './Navbar';

describe('Navbar', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders the institute title', () => {
    render(<Navbar />);

    expect(screen.getByText(/Clay-Gilmore Institute/)).toBeInTheDocument();
  });

  it('renders all navigation items', () => {
    render(<Navbar />);

    expect(screen.getAllByText('EXHIBITS').length).toBeGreaterThan(0);
    expect(screen.getAllByText('PODCASTS').length).toBeGreaterThan(0);
    expect(screen.getAllByText('UPDATES').length).toBeGreaterThan(0);
    expect(screen.getAllByText('SUBSCRIBE').length).toBeGreaterThan(0);
    expect(screen.getAllByText('ABOUT US').length).toBeGreaterThan(0);
  });

  it('PODCASTS link points to YouTube playlist', () => {
    render(<Navbar />);

    const podcastLinks = screen.getAllByText('PODCASTS');
    const firstPodcastLink = podcastLinks[0].closest('a');

    expect(firstPodcastLink).toHaveAttribute(
      'href',
      'https://youtube.com/playlist?list=PL3yt4Dw2i5BgJ-9UpC4WPX1OribA1DKYT&si=Dpmoer6TR3Newt8x'
    );
  });

  it('PODCASTS link opens in new tab', () => {
    render(<Navbar />);

    const podcastLinks = screen.getAllByText('PODCASTS');
    const firstPodcastLink = podcastLinks[0].closest('a');

    expect(firstPodcastLink).toHaveAttribute('target', '_blank');
    expect(firstPodcastLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('navigation links have hover styling for red color', () => {
    render(<Navbar />);

    const exhibitsLinks = screen.getAllByText('EXHIBITS');
    const firstExhibitsLink = exhibitsLinks[0].closest('a');

    expect(firstExhibitsLink?.className).toContain('hover:text-red-700');
  });

  it('navigation links have cursor pointer', () => {
    render(<Navbar />);

    const exhibitsLinks = screen.getAllByText('EXHIBITS');
    const firstExhibitsLink = exhibitsLinks[0].closest('a');

    expect(firstExhibitsLink?.className).toContain('cursor-pointer');
  });

  it('has sticky positioning', () => {
    render(<Navbar />);

    // Find the sticky nav container
    const stickyNav = document.querySelector('.sticky');
    expect(stickyNav).toBeInTheDocument();
    expect(stickyNav?.className).toContain('top-0');
    expect(stickyNav?.className).toContain('z-50');
  });

  it('uses Lexend font for branding', () => {
    render(<Navbar />);

    const title = screen.getByText(/Clay-Gilmore Institute/);
    expect(title).toHaveStyle({ fontFamily: 'var(--font-lexend)' });
  });
});
