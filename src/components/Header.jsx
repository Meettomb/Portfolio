
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

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
    const headerVisibleRef = useRef(true);
    const [isOpen, setIsOpen] = useState(false);
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const scrollTrigger = ScrollTrigger.create({
            start: 0,
            end: "max",
            onUpdate: (self) => {
                const isAtTop = self.scroll() <= 10;
                const shouldShowHeader = isAtTop || self.direction === -1;

                if (headerVisibleRef.current !== shouldShowHeader) {
                    headerVisibleRef.current = shouldShowHeader;
                    setIsHeaderVisible(shouldShowHeader);
                    if (!shouldShowHeader) {
                        setIsOpen(false);
                    }
                }
            },
        });

        return () => scrollTrigger.kill();
    }, []);

    // =================================
    // GSAP NAVIGATION ANIMATION
    // =================================

    useEffect(() => {
        const ctx = gsap.context(() => {

            gsap.from(".desktop-nav li", {
                opacity: 0,
                y: -10,
                duration: 0.4,
                stagger: 0.1,
                ease: "power2.out",
                delay: 0.3,
            });

        }, headerRef);

        return () => ctx.revert();
    }, []);


    // =================================
    // MENU CONTROLS
    // =================================

    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    const scrollToSection = (e, href) => {
        e.preventDefault();
        setIsOpen(false);

        const smoother = window.__smoother;
        if (smoother) {
            smoother.scrollTo(href, true, 'top 80px'); // 80px = your header height
        }
    };


    // =================================
    // LOGO NAVIGATION
    // =================================

    const handleLogoClick = () => {
        setIsOpen(false);
        navigate("/");
        window.__smoother?.scrollTo(0, true);
    };


    // =================================
    // RENDER
    // =================================

    return (
        <motion.header
            ref={headerRef}
            className="header"
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: isHeaderVisible ? 0 : "-100%", opacity: 1 }}
            transition={{
                duration: isHeaderVisible ? 0.6 : 0.35,
                ease: "easeOut",
            }}
        >

            {/* LOGO */}

            <div
                className="logo"
                onClick={handleLogoClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        handleLogoClick();
                    }
                }}
            >
                <p>
                    MP<span>.</span>
                </p>
            </div>


            {/* DESKTOP NAVIGATION */}

            <nav className="nav desktop-nav">
                <ul>
                    {navLinks.map((link) => (
                        <li
                            key={link.id}
                            data-cursor="hover"
                        >
                            <a href={link.href} onClick={(e) => scrollToSection(e, link.href)}>
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>


            {/* HAMBURGER BUTTON */}

            <button
                className="hamburger-btn"
                onClick={toggleMenu}
                aria-label={isOpen ? "Close navigation" : "Open navigation"}
                aria-expanded={isOpen}
                data-cursor="hover"
            >
                {isOpen ? (
                    <X size={28} />
                ) : (
                    <Menu size={28} />
                )}
            </button>


            {/* MOBILE NAVIGATION */}

            <AnimatePresence>
                {isOpen && (
                    <motion.nav
                        className="mobile-nav"
                        initial={{
                            opacity: 0,
                            y: -20
                        }}
                        animate={{
                            opacity: 1,
                            y: 0
                        }}
                        exit={{
                            opacity: 0,
                            y: -20
                        }}
                        transition={{
                            duration: 0.25,
                            ease: "easeOut"
                        }}
                    >
                        <ul>
                            {navLinks.map((link) => (
                                <li
                                    key={link.id}
                                    data-cursor="hover"
                                >
                                    <a
                                        href={link.href}
                                        onClick={(e) => scrollToSection(e, link.href)}
                                    >
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
