import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
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

            reveal('.AboutHeading');
            reveal('.AboutLeftside');
            reveal('.AboutQuote');

            // Right side: each card animates in with a stagger,
            // triggered when the column itself scrolls into view
            gsap.from('.AboutRightside > div', {
                y: 25,
                opacity: 0,
                duration: 0.5,
                stagger: 0.12,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.AboutRightside',
                    start: 'top 85%',
                    once: true,
                },
            });

        }, section);

        return () => aboutCtx.revert();
    }, []);



    return (
        <>
            <main className='AboutSectionMain' id="about" ref={compRef}>
                <h1 className='AboutHeading section_heading'>
                    I turn curiosity into <em>things that work</em>.
                </h1>

                <section className='AboutContent'>

                    <div className='AboutLeftside'>
                        <p>I’m a Full Stack Developer who enjoys building complete software products. My interests cover frontend development, backend engineering, database integration, and desktop application development.</p>

                        <p>I enjoy understanding how different parts of an application work together and turning ideas into reliable, functional products. I’m currently a fresher, completing my MCA at LJ University.</p>
                    </div>

                    <div className="AboutRightside">
                        <div>
                            <b>Frontend</b>
                            <p>Responsive, interactive interfaces with React.js.</p>
                        </div>

                        <div>
                            <b>Backend</b>
                            <p>REST APIs, authentication systems, and application logic.</p>
                        </div>

                        <div>
                            <b>Databases</b>
                            <p>Structured and document-based databases.</p>
                        </div>

                        <div>
                            <b>Desktop</b>
                            <p>Windows applications using C# and .NET.</p>
                        </div>
                        <div>
                            <b>Mobile App Development</b>
                            <p>Native Android app development using Kotlin.</p>
                        </div>
                    </div>

                </section>

                <p className="AboutQuote">Write clean code. Solve meaningful problems. Build products that people enjoy using.</p>
            </main>
        </>
    )
}
