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
            const aboutTl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    once: true,
                },
            });

            aboutTl
                .from('.AboutHeading', {
                    y: 25,
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power2.out',
                })
                .from('.AboutLeftside', {
                    y: 25,
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power2.out',
                })
                .from('.AboutRightside', {
                    y: 25,
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power2.out',
                });
        }, section);

        return () => {
            aboutCtx.revert();
        };
    }, []);

    return (
        <>
            <main className='AboutSectionMain' id="about" ref={compRef}>
                <h1 className='AboutHeading'>Littel About Me..</h1>

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
                            <b>PHP</b>
                            <p>PHP-based web development and Laravel.</p>
                        </div>
                    </div>

                </section>
            </main>
        </>
    )
}
