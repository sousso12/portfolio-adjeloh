import "./Footer.css";
import { FiGithub, FiMail } from "react-icons/fi";

function Footer() {

    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">

            <div className="footer-container">

                {/* LOGO */}
                <div className="footer-logo">
                    AS
                </div>

                {/* LIENS */}
                <ul className="footer-links">
                    <li><a href="#about">About</a></li>
                    <li><a href="#projects">Projects</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>

                {/* ICONES SOCIALES */}
                <div className="footer-socials">
                    <a
                        href="https://github.com/sousso12"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-social-link"
                        title="GitHub"
                    >
                        <FiGithub />
                    </a>
                    <a
                        href="mailto:grand12adjeloh@gmail.com"
                        className="footer-social-link"
                        title="Email"
                    >
                        <FiMail />
                    </a>
                </div>

            </div>

            {/* SEPARATEUR */}
            <div className="footer-divider"></div>

            {/* COPYRIGHT */}
            <div className="footer-bottom">
                <p className="footer-copy">
                    © {currentYear} Adjeloh Sousso. Tous droits réservés.
                </p>
                <p className="footer-made">
                    Fait avec <span className="footer-heart">♥</span> à Lomé, Togo
                </p>
            </div>

        </footer>
    );
}

export default Footer;