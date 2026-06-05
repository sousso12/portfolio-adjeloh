import "./Hero.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ParticlesBackground from "../components/ParticlesBackground";
import RobotScene from "../components/RobotScene";

function Hero() {

    const titleRef = useRef();
    const subtitleRef = useRef();
    const descriptionRef = useRef();
    const buttonRef = useRef();

    useEffect(() => {

        const ctx = gsap.context(() => {

            gsap.set([titleRef.current, subtitleRef.current, descriptionRef.current, buttonRef.current], {
                opacity: 1
            });

            const tl = gsap.timeline({ delay: 0.2 });

            tl.fromTo(titleRef.current,
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
            )
            .fromTo(subtitleRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
            )
            .fromTo(descriptionRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
            )
            .fromTo(buttonRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
            );

        });

        return () => ctx.revert();

    }, []);

    return (
        <section className="hero">

            <div className="hero-glow"></div>
            <ParticlesBackground />

            <div className="hero-layout">

                {/* TEXTE GAUCHE */}
                <div className="hero-content">

                    <h1 ref={titleRef} className="hero-title">
                        ADJELOH SOUSSO
                    </h1>

                    <h2 ref={subtitleRef} className="hero-subtitle">
                        Full Stack Developer
                    </h2>

                    <p ref={descriptionRef} className="hero-description">
                        Building modern web and mobile applications
                        with Spring Boot, Angular and Flutter.
                    </p>

                    <a ref={buttonRef} href="#projects" className="hero-button">
                        Voir mes projets
                    </a>

                </div>

                {/* ROBOT DROITE */}
                <div className="hero-robot">
                    <RobotScene />
                </div>

            </div>

        </section>
    );
}

export default Hero;