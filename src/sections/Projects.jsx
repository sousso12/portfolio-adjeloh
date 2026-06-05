import "./Projects.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiGithub } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        id: 1,
        name: "IZIBUS",
        description: "Application complète de réservation de tickets de bus en ligne. Plateforme multi-support avec backend robuste, application mobile et interface web moderne.",
        techs: ["Flutter", "Spring Boot", "Angular", "Java"],
        category: "Fullstack",
        links: [
            { label: "Backend", url: "https://github.com/sousso12/Izibus_Backend" },
            { label: "Mobile", url: "https://github.com/sousso12/Izibus_Mobile" },
            { label: "Web", url: "https://github.com/sousso12/Izibus_Web" },
        ],
        featured: true,
    },
    {
        id: 2,
        name: "TASK-MASTER",
        description: "Application web de gestion de tâches avec interface Angular moderne et API REST Spring Boot. Productivité et organisation au cœur du design.",
        techs: ["Angular", "Spring Boot", "Java", "TypeScript"],
        category: "Web",
        links: [
            { label: "Frontend", url: "https://github.com/sousso12/Adjeloh-Task-Master-Frontend" },
            { label: "Backend", url: "https://github.com/sousso12/Adjeloh-Task-Master-backend" },
        ],
        featured: true,
    },
    {
        id: 3,
        name: "My Other Self",
        description: "Application mobile de journal intime sécurisé. Expérience utilisateur intime et fluide avec Flutter, sauvegarde des entrées via API Node.js.",
        techs: ["Flutter", "Node.js", "Dart"],
        category: "Mobile",
        links: [
            { label: "Frontend", url: "https://github.com/sousso12/My_Other_Self_Frontend" },
            { label: "Backend", url: "https://github.com/sousso12/My_Other_Self_Backend" },
        ],
        featured: false,
    },
    {
        id: 4,
        name: "ScanPay",
        description: "Application mobile de paiement via QR Code. Transactions rapides et sécurisées grâce à Flutter et Firebase en temps réel.",
        techs: ["Flutter", "Firebase", "Node.js", "Dart"],
        category: "Mobile",
        links: [
            { label: "GitHub", url: "https://github.com/sousso12/ScanPay_Frontend" },
        ],
        featured: false,
    },
    {
        id: 5,
        name: "CIM-COPRES",
        description: "API REST complète pour la gestion interne de l'entreprise CIM-COPRES. Architecture robuste et sécurisée 100% Java avec Spring Boot.",
        techs: ["Spring Boot", "Java", "REST API"],
        category: "Backend",
        links: [
            { label: "GitHub", url: "https://github.com/sousso12/CIM-COPRES" },
        ],
        featured: false,
    },
    {
        id: 6,
        name: "CineAdmin",
        description: "Application web de gestion de cinéma. Interface Vue.js intuitive connectée à une API Flask pour gérer films, séances et réservations.",
        techs: ["Vue.js", "Flask", "Python"],
        category: "Web",
        links: [
            { label: "Frontend", url: "https://github.com/sousso12/CineAdmin_frontend" },
            { label: "Backend", url: "https://github.com/sousso12/CineAdmin_backend" },
        ],
        featured: false,
    },
];

function Projects() {

    const sectionRef = useRef();
    const titleRef = useRef();
    const cardsRef = useRef([]);

    useEffect(() => {

        const ctx = gsap.context(() => {

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

            cardsRef.current.forEach((card, index) => {
                if (!card) return;
                gsap.fromTo(card,
                    { y: 80, opacity: 0 },
                    {
                        y: 0, opacity: 1,
                        duration: 0.7,
                        ease: "power3.out",
                        delay: index * 0.1,
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 60%",
                        }
                    }
                );
            });

        }, sectionRef);

        return () => ctx.revert();

    }, []);

    return (
        <section id="projects" ref={sectionRef} className="projects">

            <div className="projects-container">

                <div ref={titleRef} className="projects-header">
                    <span className="projects-tag">Projets</span>
                    <h2 className="projects-title">
                        Mes <span className="projects-title-blue">Réalisations</span>
                    </h2>
                    <p className="projects-subtitle">
                        6 projets Full Stack réalisés durant ma formation,
                        couvrant mobile, web et backend.
                    </p>
                </div>

                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <div
                            key={project.id}
                            ref={el => cardsRef.current[index] = el}
                            className={`project-card ${project.featured ? "project-card-featured" : ""}`}
                        >

                            {project.featured && (
                                <span className="project-featured-badge">⭐ Featured</span>
                            )}

                            <div className="project-top">
                                <span className="project-category">{project.category}</span>
                                <h3 className="project-name">{project.name}</h3>
                                <p className="project-description">{project.description}</p>
                            </div>

                            <div className="project-bottom">

                                <div className="project-techs">
                                    {project.techs.map(tech => (
                                        <span key={tech} className="project-tech-tag">{tech}</span>
                                    ))}
                                </div>

                                <div className="project-links">
                                    {project.links.map(link => (
                                        <a
                                            key={link.label}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-link"
                                        >
                                            <><FiGithub /><span>{link.label}</span></>
                                        </a>
                                    ))}
                                </div>

                            </div>

                        </div>
                    ))}
                </div>

            </div>

        </section>
    );
}

export default Projects;