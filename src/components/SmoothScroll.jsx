import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function SmoothScroll() {
    useLayoutEffect(() => {
        const smoother = ScrollSmoother.create({
            wrapper: '#smooth-wrapper',
            content: '#smooth-content',
            smooth: 1.2,
            effects: true,
            smoothTouch: 0.1,
        });

        // Let Header (and anything else) call smoother.scrollTo
        window.__smoother = smoother;

        // Recalculate positions of triggers created by other components
        ScrollTrigger.refresh();

        return () => {
            smoother.kill();
            delete window.__smoother;
        };
    }, []);

    return null;
}