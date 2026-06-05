import "./Contact.css";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";
import { FiMail, FiMapPin, FiSend } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

function Contact() {

    const sectionRef = useRef();
    const titleRef = useRef();
    const leftRef = useRef();
    const rightRef = useRef();
    const formRef = useRef();

    const [formData, setFormData] = useState({
        from_name: "",
        from_email: "",
        message: ""
    });

    const [status, setStatus] = useState("idle"); // idle | loading | success | error

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

            gsap.fromTo(leftRef.current,
                { x: -80, opacity: 0 },
                {
                    x: 0, opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 65%",
                    }
                }
            );

            gsap.fromTo(rightRef.current,
                { x: 80, opacity: 0 },
                {
                    x: 0, opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 65%",
                    }
                }
            );

        }, sectionRef);

        return () => ctx.revert();

    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.from_name || !formData.from_email || !formData.message) {
            setStatus("error");
            return;
        }

        setStatus("loading");

        try {
            await emailjs.send(
                "service_u8228z8",
                "template_xaae7uv",
                formData,
                "0aFUNLQ_9fAMLCZYw"
            );

            setStatus("success");
            setFormData({ from_name: "", from_email: "", message: "" });

        } catch (error) {
            console.error("EmailJS error:", error);
            setStatus("error");
        }
    };

    return (
        <section id="contact" ref={sectionRef} className="contact">

            <div className="contact-container">

                {/* HEADER */}
                <div ref={titleRef} className="contact-header">
                    <span className="contact-tag">Contact</span>
                    <h2 className="contact-title">
                        Travaillons <span className="contact-title-blue">ensemble</span>
                    </h2>
                    <p className="contact-subtitle">
                        Un projet en tete ? Une opportunite ? Je suis disponible
                        et pret a collaborer.
                    </p>
                </div>

                <div className="contact-content">

                    {/* GAUCHE — Infos */}
                    <div ref={leftRef} className="contact-info">

                        <div className="contact-info-card">
                            <div className="contact-info-icon">
                                <FiMail />
                            </div>
                            <div>
                                <p className="contact-info-label">Email</p>
                                <a
                                    href="mailto:grand12adjeloh@gmail.com"
                                    className="contact-info-value"
                                >
                                    grand12adjeloh@gmail.com
                                </a>
                            </div>
                        </div>

                        <div className="contact-info-card">
                            <div className="contact-info-icon">
                                <FiMapPin />
                            </div>
                            <div>
                                <p className="contact-info-label">Localisation</p>
                                <p className="contact-info-value">Lome, Togo</p>
                            </div>
                        </div>

                        <div className="contact-availability">
                            <span className="availability-dot"></span>
                            <span className="availability-text">
                                Disponible pour un stage ou une opportunite
                            </span>
                        </div>

                    </div>

                    {/* DROITE — Formulaire */}
                    <div ref={rightRef} className="contact-form-wrapper">

                        <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>

                            <div className="form-group">
                                <label className="form-label">Nom complet</label>
                                <input
                                    type="text"
                                    name="from_name"
                                    value={formData.from_name}
                                    onChange={handleChange}
                                    placeholder="Votre nom"
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    name="from_email"
                                    value={formData.from_email}
                                    onChange={handleChange}
                                    placeholder="votre@email.com"
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Votre message..."
                                    className="form-textarea"
                                    rows={5}
                                />
                            </div>

                            {status === "success" && (
                                <div className="form-feedback form-success">
                                    Message envoye avec succes !
                                </div>
                            )}

                            {status === "error" && (
                                <div className="form-feedback form-error">
                                    Erreur. Verifie les champs et reessaie.
                                </div>
                            )}

                            <button
                                type="submit"
                                className={`form-button ${status === "loading" ? "form-button-loading" : ""}`}
                                disabled={status === "loading"}
                            >
                                {status === "loading" ? (
                                    <span>Envoi en cours...</span>
                                ) : (
                                    <>
                                        <FiSend />
                                        <span>Envoyer le message</span>
                                    </>
                                )}
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default Contact;