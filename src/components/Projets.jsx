import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import projects from '../data/projects.json'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

// Gradient panel (or real screenshot if you add one in projects.json)
function ProjectArt({ project }) {
    if (project.screenshot) {
        return <img className="project_art_img" src={project.screenshot} alt={`${project.title} screenshot`} loading="lazy" />
    }
    return (
        <div className="project_art" style={{ background: project.gradient }}>
            <div className="project_art_bar"><i></i><i></i><i></i></div>
            <div className="project_art_title">{project.title}</div>
        </div>
    )
}

export default function Projects() {
    const Projects = projects.projects;
    const ProjectsCategories = [...new Set(Projects.flatMap((project) => project.categories))];

    const [selected, setSelected] = useState('All');
    const [zoom, setZoom] = useState(null);

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


    return (
        <>
            <main className="projects_main" id="projects">
                <h1 className="projects_main_title">My Projects.</h1>
                <section className="projects_category_section">
                    <ul>
                        <li key="all" {...catProps('All')}>All</li>
                        {ProjectsCategories.map((category) => (
                            <li key={category} {...catProps(category)}>{category}</li>
                        ))}
                    </ul>
                </section>

                <section className="Project_listing_section">
                    {filteredProjects.map((project) => (
                        <article
                            key={project.id}
                            className={`project_item${project.featured ? ' project_item_featured' : ''}`}
                        >
                            <button
                                type="button"
                                className="project_preview"
                                onClick={() => setZoom(project)}
                                aria-label={`Zoom ${project.title} preview`}
                            >
                                <ProjectArt project={project} />
                                <span className="project_number">{project.number}</span>
                                <span className="project_zoom_hint">Zoom preview</span>
                            </button>

                            <div className="project_info">
                                <span className="project_badge">{project.badge}</span>
                                <h2 className="project_title">{project.title}</h2>
                                <p className="project_desc">{project.description}</p>

                                {project.features.length > 0 && (
                                    <ul className="project_features">
                                        {project.features.map((f) => <li key={f}>{f}</li>)}
                                    </ul>
                                )}

                                {project.tech.length > 0 && (
                                    <ul className="project_tech">
                                        {project.tech.map((t) => <li key={t}>{t}</li>)}
                                    </ul>
                                )}

                                <div className="project_links">
                                    {project.demo && (
                                        <a className="project_btn project_btn_primary" href={project.demo.url} target="_blank" rel="noopener noreferrer">
                                            {project.demo.label} <span>↗</span>
                                        </a>
                                    )}
                                    <a className="project_btn" href={project.github} target="_blank" rel="noopener noreferrer">
                                        {project.demo ? 'GitHub' : 'View on GitHub'} <span>↗</span>
                                    </a>
                                </div>
                            </div>
                        </article>
                    ))}
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