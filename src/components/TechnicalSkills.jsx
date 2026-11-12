import React, { useState, useLayoutEffect, useRef } from 'react';
import SkillsData from '../data/skills.json';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TechnicalSkills() {
    const Skills = SkillsData.skills;
    const Concepts = SkillsData.concepts;

    // Unique categories
    const SkillsCategory = [...new Set(Skills.map((skill) => skill.category))];

    // First category selected by default
    const [activeCategory, setActiveCategory] = useState(SkillsCategory[0]);

    // Skills of the selected category
    const filteredSkills = Skills.filter(
        (skill) => skill.category === activeCategory
    );


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
                            start: 'top 90%',
                            once: true,
                        },
                    });
                });
            };

            reveal('.technical_skills_main_title');
            reveal('.skills_compartment');
            reveal('.concepts_compartment');

        }, section);

        return () => aboutCtx.revert();
    }, []);

    return (
        // ONE section, ONE main title
        <main className="technical_skills_main" id="skills" ref={compRef}>

            <h1 className='technical_skills_main_title section_heading'>
                The skills behind <em>what I build</em>.
            </h1>

            {/* Compartment 1: Technical Skills */}
            <section className="skills_compartment" aria-labelledby="skills-heading">
                <h2 id="skills-heading" className="compartment_title">
                    Technical Skills
                </h2>

                <div className="compartment_body">
                    <div className="filter_category" role="tablist" aria-label="Skill categories">
                        {SkillsCategory.map((category) => {
                            const isActive = activeCategory === category;
                            return (
                                <button
                                    key={category}
                                    type="button"
                                    role="tab"
                                    aria-selected={isActive}
                                    className={isActive ? 'skill_tab Skill_Cat_selected' : 'skill_tab'}
                                    onClick={() => setActiveCategory(category)}
                                >
                                    {category}
                                </button>
                            );
                        })}
                    </div>

                    <div className="skill_list" role="tabpanel">
                        <ul key={activeCategory}>
                            {filteredSkills.map((skill) => (
                                <li key={skill.id}>{skill.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Compartment 2: Core Concepts */}
            <section className="concepts_compartment" aria-labelledby="concepts-heading">
                <h2 id="concepts-heading" className="compartment_title">
                    Core Concepts
                </h2>

                <div className="compartment_body">
                    <div className="concepts_list">
                        <ul>
                            {Concepts.map((concept) => (
                                <li key={concept.id}>{concept.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

        </main>
    );
}