import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import educationData from '../data/education.json'

gsap.registerPlugin(ScrollTrigger)

export default function Education() {
    const items = educationData.education;
    const compRef = useRef(null);

    useLayoutEffect(() => {
        const section = compRef.current;
        if (!section) return;

        const educationCtx = gsap.context(() => {
            const reveal = (selector) => {
                gsap.utils.toArray(selector).forEach((element) => {
                    gsap.from(element, {
                        y: 25,
                        opacity: 0,
                        duration: 0.6,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: element,
                            start: 'top 90%',
                            once: true,
                        },
                    });
                });
            };

            reveal('.education_main_heading');
            reveal('.education_item');
        }, section);

        return () => educationCtx.revert();
    }, []);

    return (
        <>
            <main className="education_main" id="education" ref={compRef}>
                <h1 className="education_main_heading section_heading">
                    A foundation for <em>what comes next</em>.
                </h1>

                <section className="education_list">
                    {items.map((item) => (
                        <article
                            key={item.id}
                            className={`education_item${item.current ? ' education_item_current' : ''}`}
                        >
                            <div className="education_year">
                                {/* <span className="education_number">{item.number}</span> */}
                                <span className="education_period">{item.period}</span>
                            </div>

                            <div className="education_details">
                                {/* <span className="education_level">{item.level}</span> */}
                                <h2 className="education_degree">
                                    {item.degree}
                                    <span className="education_short"> ({item.shortName})</span>
                                </h2>
                                <p className="education_institution">{item.institution}</p>
                                <p className="education_location">{item.location}</p>

                                <div className="education_meta">
                                    <span className={`education_status${item.current ? ' is_current' : ''}`}>
                                        {item.status}
                                    </span>
                                    {item.score && (
                                        <span className="education_score">Result: {item.score}</span>
                                    )}
                                </div>
                            </div>
                        </article>
                    ))}
                </section>
            </main>
        </>
    )
}