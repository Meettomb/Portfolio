import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const navLinks = [
    { name: "Home", href: "#home", id: "home" },
    { name: "About", href: "#about", id: "about" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Experience", href: "#experience", id: "experience" },
    { name: "Contact", href: "#contact", id: "contact" },
];

const Header = () => {
    const headerRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    // Initial desktop/header GSAP animation
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.from(".header", {
                y: -80,
                opacity: 0,
                duration: 0.6,
                ease: "power3.out",
            }).from(".desktop-nav li", {
                opacity: 0,
                y: -10,
                duration: 0.4,
                stagger: 0.1,
                ease: "power2.out",
            }, "-=0.2");
        }, headerRef);

        return () => ctx.revert();
    }, []);

    const toggleMenu = () => setIsOpen((prev) => !prev);
    const closeMenu = () => setIsOpen(false);

    const navigate = useNavigate();
    function handleLogoClick() {
        navigate("/");
    }

    return (
        <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="header" ref={headerRef}>
            <div className="logo" onClick={handleLogoClick}>
                M.P
            </div>

            {/* Desktop Navigation */}
            <nav className="nav desktop-nav">
                <ul>
                    {navLinks.map((link) => (
                        <li key={link.id} data-cursor="hover">
                            <a href={link.href}>
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Hamburger / Close Toggle Button */}
            <button
                className="hamburger-btn"
                onClick={toggleMenu}
                aria-label="Toggle navigation"
                data-cursor="hover"
            >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Mobile Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.nav
                        className="mobile-nav"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                        <ul>
                            {navLinks.map((link) => (
                                <li key={link.id} data-cursor="hover">
                                    <a href={link.href} onClick={closeMenu}>
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.nav>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default Header;