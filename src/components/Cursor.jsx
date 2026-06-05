import "./Cursor.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";

function Cursor() {

    const dotRef = useRef();
    const ringRef = useRef();

    useEffect(() => {

        const dot = dotRef.current;
        const ring = ringRef.current;

        let mouseX = 0;
        let mouseY = 0;
        let ringX = 0;
        let ringY = 0;

        // Suivre la souris
        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Le point suit instantanément
            gsap.to(dot, {
                x: mouseX,
                y: mouseY,
                duration: 0.1,
                ease: "power3.out"
            });
        };

        // Animation du ring avec délai
        const animateRing = () => {
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;

            gsap.set(ring, {
                x: ringX,
                y: ringY,
            });

            requestAnimationFrame(animateRing);
        };

        animateRing();

        // Hover sur éléments cliquables
        const handleMouseEnter = () => {
            gsap.to(ring, {
                scale: 1.8,
                borderColor: "#008cff",
                opacity: 0.8,
                duration: 0.3,
                ease: "power3.out"
            });
            gsap.to(dot, {
                scale: 0.5,
                duration: 0.3,
            });
        };

        const handleMouseLeave = () => {
            gsap.to(ring, {
                scale: 1,
                borderColor: "rgba(255,255,255,0.5)",
                opacity: 1,
                duration: 0.3,
                ease: "power3.out"
            });
            gsap.to(dot, {
                scale: 1,
                duration: 0.3,
            });
        };

        // Appliquer hover sur tous les éléments cliquables
        const clickables = document.querySelectorAll(
            "a, button, .tech-card, .project-card, .stat-card"
        );

        clickables.forEach(el => {
            el.addEventListener("mouseenter", handleMouseEnter);
            el.addEventListener("mouseleave", handleMouseLeave);
        });

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            clickables.forEach(el => {
                el.removeEventListener("mouseenter", handleMouseEnter);
                el.removeEventListener("mouseleave", handleMouseLeave);
            });
        };

    }, []);

    return (
        <>
            <div ref={dotRef} className="cursor-dot"></div>
            <div ref={ringRef} className="cursor-ring"></div>
        </>
    );
}

export default Cursor;