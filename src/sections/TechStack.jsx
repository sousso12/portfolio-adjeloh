import "./TechStack.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
    SiSpringboot, SiAngular, SiFlutter, SiJavascript,
    SiTypescript, SiDart, SiHtml5,
    SiMysql, SiPostgresql, SiFirebase, SiDocker,
    SiGithub, SiTrello, SiTwilio
} from "react-icons/si";
import { FaJava, FaCss3Alt } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const categories = [
    {
        title: "Backend",
        techs: [
            { name: "Java", icon: <FaJava />, color: "#f89820" },
            { name: "Spring Boot", icon: <SiSpringboot />, color: "#6db33f" },
            { name: "Firebase", icon: <SiFirebase />, color: "#ffca28" },
            { name: "Twilio", icon: <SiTwilio />, color: "#f22f46" },
        ]
    },
    {
        title: "Frontend & Mobile",
        techs: [
            { name: "Angular", icon: <SiAngular />, color: "#dd0031" },
            { name: "Flutter", icon: <SiFlutter />, color: "#54c5f8" },
            { name: "TypeScript", icon: <SiTypescript />, color: "#3178c6" },
            { name: "Dart", icon: <SiDart />, color: "#0175c2" },
            { name: "JavaScript", icon: <SiJavascript />, color: "#f7df1e" },
            { name: "HTML5", icon: <SiHtml5 />, color: "#e34f26" },
            { name: "CSS3", icon: <FaCss3Alt />, color: "#1572b6" },
        ]
    },
    {
        title: "Base de données",
        techs: [
            { name: "MySQL", icon: <SiMysql />, color: "#4479a1" },
            { name: "PostgreSQL", icon: <SiPostgresql />, color: "#336791" },
            { name: "Firebase", icon: <SiFirebase />, color: "#ffca28" },
        ]
    },
    {
        title: "Outils",
        techs: [
            { name: "GitHub", icon: <SiGithub />, color: "#ffffff" },
            { name: "Docker", icon: <SiDocker />, color: "#2496ed" },
            { name: "Trello", icon: <SiTrello />, color: "#0052cc" },
        ]
    }
];

function TechStack() {

    const sectionRef = useRef();
    const titleRef = useRef();
    const cardsRef = useRef([]);

    useEffect(() => {

        const ctx = gsap.context(() => {

            // Animation du titre
            gsap.fromTo(titleRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                    }
                }
            );

            // Animation des cards
            cardsRef.current.forEach((card, index) => {
                if (!card) return;
                gsap.fromTo(card,
                    { y: 60, opacity: 0 },
                    {
                        y: 0, opacity: 1,
                        duration: 0.6,
                        ease: "power3.out",
                        delay: index * 0.08,
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 65%",
                        }
                    }
                );
            });

        }, sectionRef);

        return () => ctx.revert();

    }, []);

    let cardIndex = 0;

    return (
        <section id="techstack" ref={sectionRef} className="techstack">

            <div className="techstack-container">

                <div ref={titleRef} className="techstack-header">
                    <span className="techstack-tag">Technologies</span>
                    <h2 className="techstack-title">
                        Ma <span className="techstack-title-blue">Tech Stack</span>
                    </h2>
                    <p className="techstack-subtitle">
                        Les outils et technologies que j'utilise pour construire
                        des applications modernes et performantes.
                    </p>
                </div>

                <div className="techstack-categories">
                    {categories.map((category) => (
                        <div key={category.title} className="techstack-category">

                            <h3 className="category-title">{category.title}</h3>

                            <div className="tech-grid">
                                {category.techs.map((tech) => {
                                    const currentIndex = cardIndex++;
                                    return (
                                        <div
                                            key={tech.name}
                                            ref={el => cardsRef.current[currentIndex] = el}
                                            className="tech-card"
                                            style={{ "--tech-color": tech.color }}
                                        >
                                            <span className="tech-icon">{tech.icon}</span>
                                            <span className="tech-name">{tech.name}</span>
                                        </div>
                                    );
                                })}
                            </div>

                        </div>
                    ))}
                </div>

            </div>

        </section>
    );
}

export default TechStack;