import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import DevelopmentJourney from '../data/Developmentjourney.json';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Journey() {
    const journeyData = DevelopmentJourney.phases;

    const [activeIndex, setActiveIndex] = useState(0);

    const listRef = useRef(null);
    const trackRef = useRef(null);
    const fillRef = useRef(null);
    const dotRefs = useRef([]);

    useEffect(() => {
        let ticking = false;

      const update = () => {
    ticking = false;

    const list = listRef.current;
    const track = trackRef.current;
    const fill = fillRef.current;
    const dots = dotRefs.current.filter(Boolean);

    if (!list || !track || !fill || dots.length === 0) return;

    const vh = window.innerHeight;
    const listTop = list.getBoundingClientRect().top;

    // Dot centers in viewport coordinates
    const centers = dots.map((dot) => {
        const r = dot.getBoundingClientRect();
        return r.top + r.height / 2;
    });

    const firstCenter = centers[0];

    // End of the line = bottom of the last item's data (not the last dot)
    const lastItem = list.lastElementChild;
    const END_OFFSET = 0; // set a negative value (e.g. -20) to end slightly earlier
    const lineEnd = lastItem.getBoundingClientRect().bottom + END_OFFSET;

    const totalHeight = Math.max(lineEnd - firstCenter, 0);

    // Track runs from the first dot center to the end of the last item
    track.style.top = `${firstCenter - listTop}px`;
    track.style.height = `${totalHeight}px`;

    // Reference line (middle of the screen).
    // Near the page bottom it slides down so the line can reach its end.
    const docHeight = document.documentElement.scrollHeight;
    const remaining = docHeight - (window.scrollY + vh);
    const extra = Math.max(0, vh * 0.5 - remaining);
    const refY = vh * 0.5 + extra;

    // Smooth progress: follows scroll (grows and shrinks)
    const filled = Math.min(Math.max(refY - firstCenter, 0), totalHeight);
    fill.style.height = `${filled}px`;

    // Active dot = last dot the line has passed
    let current = 0;
    centers.forEach((c, i) => {
        if (c <= refY) current = i;
    });

    setActiveIndex((prev) => (prev === current ? prev : current));
};

        const onScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(update);
            }
        };

        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, [journeyData.length]);


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
    
                reveal('.development_journey_title');
    
            }, section);
    
            return () => aboutCtx.revert();
        }, []);


    return (
        <main className="journey_main" id="journey" ref={compRef}>
            <h1 className="development_journey_title">Development journey.</h1>

            <section className="journey_section">
                <div className="journey_list" ref={listRef}>
                    {/* Background line */}
                    <div className="journey_progress_track" ref={trackRef}>
                        {/* Progress fill (height set on scroll) */}
                        <div className="journey_progress_fill" ref={fillRef} />
                    </div>

                    {journeyData.map((phase, index) => (
                        <div
                            key={phase.id}
                            className={`journey_item ${
                                activeIndex === index ? 'current' : ''
                            } ${activeIndex >= index ? 'passed' : ''}`}
                        >
                            <div
                                className={`journey_dot ${
                                    activeIndex >= index ? 'active' : ''
                                }`}
                                ref={(el) => (dotRefs.current[index] = el)}
                            />

                            <h2>Phase {String(phase.id).padStart(2, '0')}</h2>
                            <h3>{phase.title}</h3>

                            <ul>
                                {phase.skills.map((skill, skillIndex) => (
                                    <li key={skillIndex}>{skill}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}