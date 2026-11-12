
import React from 'react'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import navLinksData from '../data/navLinks.json'

export default function Footer() {

    // =================================
    // SCROLL TO TOP
    // =================================

    const scrollToTop = () => {
        const smoother = window.__smoother || ScrollSmoother.get()

        if (smoother) smoother.scrollTo(0, true)
        else window.scrollTo({ top: 0, behavior: 'smooth' })
    }


    // =================================
    // SECTION NAVIGATION
    // =================================

    const scrollToSection = (e, href) => {
        e.preventDefault()

        const smoother = window.__smoother

        if (smoother) {
            smoother.scrollTo(href, true, 'top 80px')
        }
    }


    // =================================
    // RENDER
    // =================================

    return (
        <footer className="footer_main">

            {/* BRAND */}

            <div className="footer_brand">
                <a
                    className="footer_logo"
                >
                    MP<span>.</span>
                </a>

                <span className="footer_name">Meet Patel</span>

                <p className="footer_info">
                    Full Stack Developer <span>·</span> © {new Date().getFullYear()}
                </p>
            </div>


            <button
                type="button"
                className="footer_top_btn"
                onClick={scrollToTop}
                aria-label="Back to top"
            >
                ↑
            </button>

        </footer>
    )
}
