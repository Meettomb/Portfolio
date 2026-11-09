import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { Download } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import navLinksData from '../data/navLinks.json';
import Projects from '../data/projects.json';

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function Hero() {
    const navLinks = navLinksData;
    const compRef = useRef(null);
    const overviewRef = useRef(null);

    const textRef = useRef(null);
    const cursorRef = useRef(null);
    const imageRef = useRef(null);

    const projects = Projects.projects
    const Totalprojects = projects.length
    const ProgrammingLanguages = new Set(
        projects.flatMap((project) => project.programmingLanguages ?? [])
    ).size

    const DevelopmentAreas = new Set(
        projects.flatMap((project) => project.developmentAreas ?? [])
    ).size

    const titles = [
        'Full Stack Developer',
        '.Net Enthusiast',
        'React & Node.js Developer',
    ];

    useLayoutEffect(() => {

        // =================================
        // 1. HERO SECTION ANIMATIONS
        // =================================

        const heroCtx = gsap.context(() => {

            // Initial Page Load Entrance Timeline
            const introTl = gsap.timeline({
                defaults: {
                    ease: 'power3.out'
                }
            });

            introTl
                .from('.hero-greeting', {
                    y: 20,
                    opacity: 0,
                    duration: 0.6,
                })
                .from('.hero-name', {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                }, '-=0.3')
                .addLabel('hero-title', '-=0.4')
                .from('.hero-title', {
                    y: 20,
                    opacity: 0,
                    duration: 0.6,
                }, 'hero-title')
                .from('.hero-description', {
                    y: 20,
                    opacity: 0,
                    duration: 0.6,
                }, '-=0.4')
                .from(
                    '.hero-actions .hero-btn, .hero-actions .hero-btn-secondary',
                    {
                        y: 20,
                        opacity: 0,
                        stagger: 0.12,
                        duration: 0.5,
                        clearProps: 'all'
                    },
                    'hero-title'
                )
                .from(imageRef.current, {
                    scale: 0.7,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'back.out(1)',
                }, 0.8);


            // 2. Subtle Floating Animation
            gsap.to(imageRef.current, {
                y: -14,
                duration: 3,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
            });


            // 3. Fluid Blob Morphing Animation
            gsap.to(
                ['.blob-shape', '.blob-backdrop', '.blob-ring'],
                {
                    borderRadius: '50%',
                    duration: 4,
                    ease: 'sine.inOut',
                    repeat: -1,
                    yoyo: true,
                }
            );


            // 4. Blinking Cursor Animation
            gsap.to(cursorRef.current, {
                opacity: 0,
                ease: 'power2.inOut',
                repeat: -1,
                yoyo: true,
                duration: 0.5,
            });


            // 5. Looping Typewriter Timeline
            const masterTl = gsap.timeline({
                repeat: -1
            });

            titles.forEach((title) => {

                const tl = gsap.timeline({
                    repeat: 1,
                    yoyo: true,
                    repeatDelay: 1.5,
                });

                tl.to(textRef.current, {
                    duration: title.length * 0.08,
                    text: title,
                    ease: 'none',
                });

                masterTl.add(tl);
            });

        }, compRef);


        // =================================
        // 2. PROJECT OVERVIEW COUNTER
        // =================================

        const overviewCtx = gsap.context(() => {

            gsap.from('#total-projects, #total-language-used, #devlopment-areas', {
                innerText: 0,
                duration: 0.8,
                snap: {
                    innerText: 1
                },
                ease: 'power2.out',

                scrollTrigger: {
                    trigger: '#total-projects, #total-language-used, #devlopment-areas',
                    start: 'top 80%',
                    once: true,
                }
            });

        }, overviewRef);


        // =================================
        // 3. CLEANUP
        // =================================

        return () => {
            heroCtx.revert();
            overviewCtx.revert();
        };

    }, []);


    const scrollToSection = (e, href) => {
        e.preventDefault();

        const smoother = window.__smoother;

        if (smoother) {
            smoother.scrollTo(href, true, 'top 80px');
        } else {
            document.querySelector(href)?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <>
            {/* =================================
                HERO SECTION
            ================================= */}

            <section className="hero"
                id="home"
                ref={compRef}
            >

                <div className="hero-content">

                    <p className="hero-greeting">
                        Hello, I'm
                    </p>

                    <h1 className="hero-name">
                        Meet Patel
                    </h1>

                    <h2 className="hero-title">
                        <span ref={textRef}></span>

                        <span
                            ref={cursorRef}
                            className="typewriter-cursor"
                        >
                            |
                        </span>
                    </h2>

                    <p className="hero-description">
                        I build modern, responsive, and user-friendly web
                        applications with a focus on clean code and great
                        user experiences.
                    </p>


                    {/* Hero Actions */}

                    <div className="hero-actions">

                        <a
                            href="#projects"
                            className="hero-btn"
                            data-cursor="hover"
                            onClick={(e) => scrollToSection(
                                e,
                                navLinks.find((link) => link.id === 'projects')?.href || '#projects'
                            )}
                        >
                            View My Work
                        </a>

                        <a
                            href="#contact"
                            className="hero-btn-secondary"
                            data-cursor="hover"
                        >
                            Contact Me
                        </a>

                        <a
                            href="/resume.pdf"
                            download="Meet-Patel-Resume.pdf"
                            className="hero-btn-secondary"
                            data-cursor="hover"
                        >
                            <Download size={18} />
                            Download Resume
                        </a>

                        <a
                            href="https://github.com/Meettomb"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hero-btn-secondary"
                            data-cursor="hover"
                        >
                            <FaGithub size={18} />
                            GitHub
                        </a>

                    </div>

                </div>


                {/* Morphing Organic Blob Visual */}

                <div
                    className="hero-image"
                    ref={imageRef}
                >

                    <div className="blob-container">

                        {/* Ambient Glow */}
                        <div className="blob-glow"></div>

                        {/* Floating Border Outline */}
                        <div className="blob-ring"></div>

                        {/* Layered Backdrop */}
                        <div className="blob-backdrop"></div>

                        {/* Profile Image */}
                        <div className="blob-shape">
                            <img
                                src="/assets/profile2.webp"
                                alt="Meet Patel"
                                loading="eager"
                                fetchPriority="high"
                                decoding="async"
                            />
                        </div>

                    </div>

                </div>

            </section>


            {/* =================================
                PROJECT OVERVIEW SECTION
            ================================= */}

            <section
                className="littel_projet_overview"
                ref={overviewRef}
            >

                <div className="littel_projet_overview_content">

                    <div className="total_project">

                        <p id="total-projects">
                            {Totalprojects}
                        </p>

                        <p>
                            Project Showcased
                        </p>

                    </div>


                    <div className="total_language_used">

                        <p id='total-language-used'>{ProgrammingLanguages}</p>

                        <p>
                            Programming languages
                        </p>

                    </div>


                    <div className="total_development_areas">

                        <p id='devlopment-areas'>{DevelopmentAreas}</p>

                        <p>
                            Development areas
                        </p>

                    </div>


                    <div className="specialization_areas">

                        <p>MERN &amp; .Net</p>

                        <p>
                            Ecosystem
                        </p>

                    </div>

                </div>

            </section>

        </>
    );
}
