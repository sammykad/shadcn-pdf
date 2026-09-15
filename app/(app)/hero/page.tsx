import type { Metadata } from "next";
import DitherReveal from "@/components/DitherReveal";

export const metadata: Metadata = {
    title: "Nomanik — Independent Design Agency",
    description:
        "Nomanik builds distinctive brands, digital products, and experiences for ambitious companies.",
};

const navigation = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#how-it-works" },
    { label: "Process", href: "#process" },
    { label: "Work", href: "#work" },
    { label: "Contact", href: "#contact" },
];

export default function Hero() {
    return (
        <main className="landing">
            <section className="hero" id="home">
                <div className="noise" aria-hidden="true" />

                <div className="dither-layer" aria-hidden="true">
                    <DitherReveal image={{ src: "/white-hands.png", alt: "" }} />
                </div>

                <header className="site-header">
                    <a className="brand" href="#home" aria-label="Nomanik home">
                        Nomanik
                    </a>

                    <nav className="desktop-nav" aria-label="Primary navigation">
                        {navigation.map((item) => (
                            <a key={item.label} href={item.href}>
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    <a className="header-cta" href="#journey">
                        Start a project
                        <span aria-hidden="true">↗</span>
                    </a>
                </header>

                <section className="hero-content" aria-labelledby="hero-title">
                    <p className="eyebrow">Independent design agency</p>
                    <h1 id="hero-title">
                        <span className="headline-line headline-line-muted">
                            Build Brands With Meaning
                        </span>
                        <span className="headline-line">and Experiences That Move</span>
                    </h1>
                    <p className="hero-copy">
                        From strategy to launch — we shape distinctive identities,
                        <br className="desktop-break" /> digital products, and experiences built to matter.
                    </p>
                    <a className="primary-cta" href="#journey" id="journey">
                        Start a project
                        <span aria-hidden="true">↗</span>
                    </a>
                </section>

                <footer className="hero-footer">
                    <p>Every strong brand begins with a clear idea.</p>
                    <a className="scroll-cue" href="#how-it-works">
                        scroll <span aria-hidden="true">↓</span>
                    </a>
                    <p>
                        Strategy, identity, and digital craft
                        <br /> for ambitious brands moving forward.
                    </p>
                </footer>

            </section>

        </main>
    );
}
