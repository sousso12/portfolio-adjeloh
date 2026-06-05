import "./Navbar.css";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

function Navbar() {

    const navRef = useRef();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {

        // Animation d'apparition
        gsap.fromTo(navRef.current,
            { y: -80, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
        );

        // Effet glassmorphism au scroll
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);

    }, []);

    return (
        <nav ref={navRef} className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>

            <div className="navbar-logo">
                AS
            </div>

            <ul className={`navbar-links ${menuOpen ? "navbar-links-open" : ""}`}>
                <li><a href="#about" onClick={() => setMenuOpen(false)}>About</a></li>
                <li><a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a></li>
                <li><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
            </ul>

            <div
                className={`navbar-burger ${menuOpen ? "burger-open" : ""}`}
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>

        </nav>
    );
}

export default Navbar;