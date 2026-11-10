import React, { useState, useEffect, useRef, useLayoutEffect} from 'react'
import { createPortal } from 'react-dom'
import projects from '../data/projects.json'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { FaList, FaGrip } from 'react-icons/fa6';
import gsap from 'gsap';

// Gradient panel (or real screenshot if you add one in projects.json)
function ProjectArt({ project }) {
    const [videoFailed, setVideoFailed] = useState(false);

    // Existing screenshot support
    if (project.screenshot) {
        return (
            <img
                className="project_art_img"
                src={project.screenshot}
                alt={`${project.title} screenshot`}
                loading="lazy"
            />
        );
    }

    // Fallback artwork
    const fallbackArt = (
        <div className="project_art" style={{ background: project.gradient }}>
            <div className="project_art_bar">
                <i></i>
                <i></i>
                <i></i>
            </div>
            <div className="project_art_title">{project.title}</div>
        </div>
    );

    // No video or video failed
    if (!project.videoLink || videoFailed) {
        return fallbackArt;
    }

    return (
        <div className="project_video_wrapper">
            <video
                className="project_video"
                src={project.videoLink}
                autoPlay
                muted
                loop
                playsInline
                onError={() => setVideoFailed(true)}
            />
        </div>
    );
}

export default function Projects() {
    const Projects = projects.projects;
    const ProjectsCategories = [...new Set(Projects.flatMap((project) => project.categories))];

    const [selected, setSelected] = useState('All');
    const [zoom, setZoom] = useState(null);

    const [layout, setLayout] = useState('list');

    const filteredProjects = selected === 'All'
        ? Projects
        : Projects.filter((project) => project.categories.includes(selected));


    // Stop background scroll while the popup is open
    useEffect(() => {
        if (!zoom) return;

        const smoother = ScrollSmoother.get();   // null if you don't use ScrollSmoother
        smoother?.paused(true);

        // Backup: block wheel / touch scrolling everywhere
        const block = (e) => e.preventDefault();
        window.addEventListener('wheel', block, { passive: false });
        window.addEventListener('touchmove', block, { passive: false });

        // Backup: block keyboard scrolling (space, arrows, page up/down)
        const blockKeys = (e) => {
            if ([' ', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.key)) e.preventDefault();
        };
        window.addEventListener('keydown', blockKeys);

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            smoother?.paused(false);
            window.removeEventListener('wheel', block);
            window.removeEventListener('touchmove', block);
            window.removeEventListener('keydown', blockKeys);
            document.body.style.overflow = prevOverflow;
        };
    }, [zoom]);

    // Close the zoom preview with Escape
    useEffect(() => {
        const onKey = (e) => e.key === 'Escape' && setZoom(null);
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    const catProps = (name) => ({
        className: selected === name ? 'Cat_selected' : '',
        onClick: () => setSelected(name),
        onKeyDown: (e) => (e.key === 'Enter' || e.key === ' ') && setSelected(name),
        tabIndex: 0,
        role: 'button',
        'aria-pressed': selected === name,
    });



     const compRef = useRef(null);
    
        useLayoutEffect(() => {
            const section = compRef.current;
            if (!section) return;
    
            const aboutCtx = gsap.context(() => {
    
                const reveal = (selector, vars = {}) => {
                    gsap.utils.toArray(selector).forEach((el) => {
                        gsap.from(el, {
                            y: 25,
                            opacity: 0,
                            duration: 0.6,
                            ease: 'power2.out',
                            ...vars,
                            scrollTrigger: {
                                trigger: el,
                                start: 'top 85%',
                                once: true,
                            },
                        });
                    });
                };
    
                reveal('.projects_main_title');
                reveal('.projects_category_section');
                reveal('.project_layout_switcher');

            }, section);
    
            return () => aboutCtx.revert();
        }, []);

        useLayoutEffect(() => {
            const section = compRef.current;
            if (!section) return;

            const animationCtx = gsap.context(() => {
                let visibleIndex = 0;

                gsap.utils.toArray('.project_item').forEach((item) => {
                    const rect = item.getBoundingClientRect();

                    if (rect.bottom <= 0) return;

                    const animation = {
                        y: 25,
                        opacity: 0,
                        duration: 0.5,
                        ease: 'power2.out',
                    };

                    if (rect.top < window.innerHeight) {
                        gsap.fromTo(item, animation, {
                            y: 0,
                            opacity: 1,
                            duration: animation.duration,
                            ease: animation.ease,
                            delay: visibleIndex * 0.1,
                        });
                        visibleIndex += 1;
                        return;
                    }

                    gsap.fromTo(item, animation, {
                        y: 0,
                        opacity: 1,
                        duration: animation.duration,
                        ease: animation.ease,
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 85%',
                            once: true,
                        },
                    });
                });

            }, section);

            return () => animationCtx.revert();
        }, [layout, selected]);
    

    return (
        <>
            <main className="projects_main" id="projects" ref={compRef}>
                <h1 className="projects_main_title">My Projects.</h1>

                <section className="projects_category_section">
                    <ul>
                        <li key="all" {...catProps('All')}>All</li>
                        {ProjectsCategories.map((category) => (
                            <li key={category} {...catProps(category)}>{category}</li>
                        ))}
                    </ul>
                </section>

                <div className="project_layout_switcher">
                    <button
                        type="button"
                        className={layout === 'list' ? 'active' : ''}
                        onClick={() => setLayout('list')}
                        aria-pressed={layout === 'list'}
                        aria-label="List view"
                    >
                        <FaList />
                    </button>

                    <button
                        type="button"
                        className={layout === 'grid' ? 'active' : ''}
                        onClick={() => setLayout('grid')}
                        aria-pressed={layout === 'grid'}
                        aria-label="Grid view"
                    >
                        <FaGrip />
                    </button>
                </div>

                <section className={`Project_listing_section ${layout}-layout`}>
                    <div className="project_listing_grid">
                        {filteredProjects.map((project) => (
                            <article
                                key={project.id}
                                className={`project_item${project.featured ? ' project_item_featured' : ''}`}>
                                <button
                                    type="button"
                                    className="project_preview"
                                    onClick={() => setZoom(project)}
                                    aria-label={`Zoom ${project.title} preview`}
                                >
                                    <ProjectArt project={project} />

                                    <span className="project_number">
                                        {project.number}
                                    </span>

                                    {/* <span className="project_zoom_hint">
                                        Zoom preview
                                    </span> */}
                                </button>

                                <div className="project_info">
                                    <span className="project_badge">
                                        {project.badge}
                                    </span>

                                    <h2 className="project_title">
                                        {project.title}
                                    </h2>

                                    <p className="project_desc">
                                        {project.description}
                                    </p>

                                    {project.features.length > 0 && (
                                        <ul className="project_features">
                                            {project.features.map((f) => (
                                                <li key={f}>{f}</li>
                                            ))}
                                        </ul>
                                    )}

                                    {project.tech.length > 0 && (
                                        <ul className="project_tech">
                                            {project.tech.map((t) => (
                                                <li key={t}>{t}</li>
                                            ))}
                                        </ul>
                                    )}

                                    <div className="project_links">
                                        {project.demo && (
                                            <a
                                                className="project_btn project_btn_primary"
                                                href={project.demo.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {project.demo.label} <span>↗</span>
                                            </a>
                                        )}

                                        <a
                                            className="project_btn"
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {project.demo ? 'GitHub' : 'View on GitHub'}
                                            <span>↗</span>
                                        </a>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>


                {zoom && createPortal(
                    <div
                        className="project_lightbox open"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Project preview"
                        onClick={() => setZoom(null)}
                    >
                        <div
                            className="project_lightbox_content"
                            onClick={(e) => e.stopPropagation()}
                        >


                            <ProjectArt project={zoom} />
                        </div>
                    </div>,
                    document.body
                )}
            </main>
        </>
    )
}