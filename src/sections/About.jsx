import "./About.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function About() {

    const sectionRef = useRef();
    const textRef = useRef();
    const statsRef = useRef();

    useEffect(() => {

        const ctx = gsap.context(() => {

            // Animation du texte
            gsap.fromTo(textRef.current,
                { x: -80, opacity: 0 },
                {
                    x: 0, opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                    }
                }
            );

            // Animation des stats
            gsap.fromTo(statsRef.current,
                { x: 80, opacity: 0 },
                {
                    x: 0, opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                    }
                }
            );

        }, sectionRef);

        return () => ctx.revert();

    }, []);

    return (
        <section id="about" ref={sectionRef} className="about">

            <div className="about-container">

                {/* TEXTE GAUCHE */}
                <div ref={textRef} className="about-text">

                    <span className="about-tag">À propos</span>

                    <h2 className="about-title">
                        Passionné par le code,<br />
                        <span className="about-title-blue">orienté résultats</span>
                    </h2>

                    <p className="about-description">
                        Développeur Full Stack de 22 ans basé à Lomé, Togo,
                        actuellement en fin de licence en Informatique.
                        Passionné par la création d'applications web et mobiles
                        modernes, je conçois des solutions complètes alliant
                        performance, design et expérience utilisateur.
                    </p>

                    <p className="about-description">
                        Spécialisé en <span className="about-highlight">Spring Boot</span>,{" "}
                        <span className="about-highlight">Angular</span> et{" "}
                        <span className="about-highlight">Flutter</span>, je transforme
                        des idées en produits digitaux concrets, du backend
                        robuste jusqu'à l'interface mobile intuitive.
                    </p>

                    <a href="#contact" className="about-button">
                        Me contacter
                    </a>

                </div>

                {/* STATS DROITE */}
                <div ref={statsRef} className="about-stats">

                    <div className="stat-card">
                        <span className="stat-number">6+</span>
                        <span className="stat-label">Projets réalisés</span>
                    </div>

                    <div className="stat-card">
                        <span className="stat-number">3</span>
                        <span className="stat-label">Années de formation</span>
                    </div>

                    <div className="stat-card">
                        <span className="stat-number">3</span>
                        <span className="stat-label">Technologies maîtrisées</span>
                    </div>

                    <div className="stat-card">
                        <span className="stat-number">100%</span>
                        <span className="stat-label">Passion & Motivation</span>
                    </div>

                </div>

            </div>

        </section>
    );
}

export default About;