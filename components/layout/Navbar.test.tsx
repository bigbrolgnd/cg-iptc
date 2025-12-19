import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { Navbar } from './Navbar';

describe('Navbar', () => {
  afterEach(() => {
    cleanup();
  });

  it('[P1] renders the institute title', () => {
    // GIVEN: Navbar component with pathname
    render(<Navbar pathname="/" />);

    // THEN: Institute title is displayed
    expect(screen.getByText(/Clay-Gilmore Institute/)).toBeInTheDocument();
  });

  it('[P1] renders all navigation items', () => {
    // GIVEN: Navbar component
    render(<Navbar pathname="/" />);

    // THEN: All nav items are present (duplicated for mobile ticker)
    expect(screen.getAllByText('HOME').length).toBeGreaterThan(0);
    expect(screen.getAllByText('EXHIBITIONS').length).toBeGreaterThan(0);
    expect(screen.getAllByText('PODCASTS').length).toBeGreaterThan(0);
    expect(screen.getAllByText('UPDATES').length).toBeGreaterThan(0);
    expect(screen.getAllByText('NEWSLETTER').length).toBeGreaterThan(0);
    expect(screen.getAllByText('ABOUT US').length).toBeGreaterThan(0);
  });

  it('[P1] PODCASTS link points to YouTube playlist', () => {
    // GIVEN: Navbar component
    render(<Navbar pathname="/" />);

    // THEN: PODCASTS links to YouTube playlist
    const podcastLinks = screen.getAllByText('PODCASTS');
    const firstPodcastLink = podcastLinks[0].closest('a');

    expect(firstPodcastLink).toHaveAttribute(
      'href',
      'https://youtube.com/playlist?list=PL3yt4Dw2i5BgJ-9UpC4WPX1OribA1DKYT&si=Dpmoer6TR3Newt8x'
    );
  });

  it('[P1] PODCASTS link opens in new tab', () => {
    // GIVEN: Navbar component
    render(<Navbar pathname="/" />);

    // THEN: External link has proper attributes
    const podcastLinks = screen.getAllByText('PODCASTS');
    const firstPodcastLink = podcastLinks[0].closest('a');

    expect(firstPodcastLink).toHaveAttribute('target', '_blank');
    expect(firstPodcastLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('[P1] navigation links have hover styling for red color', () => {
    // GIVEN: Navbar component
    render(<Navbar pathname="/" />);

    // THEN: Links have red hover state
    const exhibitionsLinks = screen.getAllByText('EXHIBITIONS');
    const firstExhibitionsLink = exhibitionsLinks[0].closest('a');

    expect(firstExhibitionsLink?.className).toContain('hover:text-red-700');
  });

  it('[P2] navigation links have cursor pointer', () => {
    // GIVEN: Navbar component
    render(<Navbar pathname="/" />);

    // THEN: Links show pointer cursor
    const exhibitionsLinks = screen.getAllByText('EXHIBITIONS');
    const firstExhibitionsLink = exhibitionsLinks[0].closest('a');

    expect(firstExhibitionsLink?.className).toContain('cursor-pointer');
  });

  it('[P1] has sticky positioning', () => {
    // GIVEN: Navbar component
    render(<Navbar pathname="/" />);

    // THEN: Navigation container is sticky
    const stickyNav = document.querySelector('.sticky');
    expect(stickyNav).toBeInTheDocument();
    expect(stickyNav?.className).toContain('top-0');
    expect(stickyNav?.className).toContain('z-50');
  });

  it('[P2] uses Oswald font for branding title', () => {
    // GIVEN: Navbar component
    render(<Navbar pathname="/" />);

    // THEN: Title uses Oswald font family
    const title = screen.getByText(/Clay-Gilmore Institute/);
    expect(title).toHaveStyle({ fontFamily: 'var(--font-oswald)' });
  });
});
