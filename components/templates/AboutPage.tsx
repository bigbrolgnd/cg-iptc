import Image from "next/image";
import { Logo } from "@/components/ui/Logo";

function AboutSection({
  title,
  heading,
  children,
  imageElement,
}: {
  title: string;
  heading: string;
  children: React.ReactNode;
  imageElement: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4 mx-auto w-full max-w-none py-8">
      {/* Image Element: Centered on full page (now above title) */}
      <div className="px-6 mt-4">
        {/* Standard centering */}
        <div className="w-full max-w-lg mx-auto">
          {imageElement}
        </div>
      </div>

      {/* Header: Title - offset left on desktop to center on full page (now below image) */}
      <header className="px-6">
        {/* Standard centering */}
        <h3 className="text-sm uppercase font-semibold tracking-widest text-red-700 mb-3 text-center">
          {title}
        </h3>
        <h2 style={{ fontFamily: 'var(--font-oswald)' }} className="text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight text-center" dangerouslySetInnerHTML={{ __html: heading }} />
      </header>

      {/* Content */}
      <div className="px-6 mt-4">
        {/* Standard centering with max-width for readability */}
        <div className="prose prose-lg max-w-3xl mx-auto text-left px-[20px]">
          {children}
        </div>
      </div>
    </section>
  );
}

export function AboutPage() {
  return (
    <article>
      <AboutSection
        title="About the Institution"
        heading="The Clay-Gilmore Institute for Philosophy,<br />Technology, and Counterinsurgency"
        imageElement={
          <Logo className="w-48 h-48 lg:w-64 lg:h-64 mx-auto" />
        }
      >
        <p>
          (CG-IPTC) was founded by Dr. Miron J. Clay-Gilmore to examine how technological and military systems reproduce racial hierarchies across the modern world. As the first philosophical institute dedicated to studying race, computation, and population-level targeting, CG-IPTC explores how war, data, and governance merge in the algorithmic age. Rooted in the traditions of Africana philosophy and Black radical thought, our work reveals how the global infrastructures of control—once physical—have become digital, statistical, and increasingly invisible.
        </p>
      </AboutSection>

      <div className="w-full max-w-5xl mx-auto my-12 border-t border-zinc-200" />

      <AboutSection
        title="Meet the Founder"
        heading="Dr. Miron J. Clay-Gilmore"
        imageElement={
          <div className="relative w-48 h-48 lg:w-64 lg:h-64 rounded-full overflow-hidden shadow-lg mx-auto">
            <Image
              src="https://framerusercontent.com/images/IYGRDaPWovSYixFsHGMAzxF0vyo.jpg"
              alt="Dr. Miron J. Clay-Gilmore"
              layout="fill"
              objectFit="cover"
              className="grayscale"
            />
          </div>
        }
      >
        <p>
          Dr. Miron J. Clay-Gilmore is the Founder and Director of the Clay-Gilmore Institute for Philosophy, Technology, and Counterinsurgency (CG-IPTC) and a Postdoctoral Research Fellow at the Centre for Ethics and the Schwartz Reisman Institute for Technology and Society at the University of Toronto. He is the first Black philosopher to earn a Ph.D. from the University of Edinburgh.
        </p>
        <p>
          Dr. Clay-Gilmore’s research examines how artificial intelligence, big data, and predictive policing sustain racial hierarchies and counterinsurgent forms of governance. His work situates contemporary algorithmic systems within the historical continuum of militarism, surveillance, and state violence, revealing how digital technologies reproduce the logics of control and dispossession. Through the CG-IPTC, he leads interdisciplinary research and public initiatives that investigate the ethical and political implications of technological power.
        </p>
        <p>
          His publications have appeared in <em>AI and Ethics</em>, <em>Res Philosophica</em>, <em>American Philosophical Quarterly</em>, and <em>The Journal of African American Studies</em>.
        </p>
      </AboutSection>
    </article>
  );
}