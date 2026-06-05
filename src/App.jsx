import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import TechStack from "./sections/TechStack";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";
import useLenis from "./hooks/useLenis";

function App() {

    useLenis();

    return (
        <>
            <Cursor />
            <Navbar />
            <Hero />
            <About />
            <TechStack />
            <Projects />
            <Contact />
            <Footer />
        </>
    );
}

export default App;