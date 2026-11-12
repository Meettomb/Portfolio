import React, { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const EMAIL = 'patelmeet23032005@gmail.com'
const RESUME_URL = '' // paste your resume PDF link here to show the Resume button

const LINKS = [
    { label: 'GitHub', text: 'github.com/Meettomb', href: 'https://github.com/Meettomb', external: true },
    { label: 'LinkedIn', text: 'meet-patel-098993293', href: 'https://www.linkedin.com/in/meet-patel-098993293', external: true },
    { label: 'Phone', text: '+91 9725254775', href: 'tel:+919725254775' },
]

export default function Contact() {
    const [copied, setCopied] = useState(false)
    const compRef = useRef(null)

    useLayoutEffect(() => {
        const section = compRef.current
        if (!section) return

        const contactCtx = gsap.context(() => {
            const reveal = (selector) => {
                gsap.utils.toArray(selector).forEach((element) => {
                    gsap.from(element, {
                        y: 25,
                        opacity: 0,
                        duration: 0.6,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: element,
                            start: 'top 85%',
                            once: true,
                        },
                    })
                })
            }

            reveal('.contact_main_heading')
            reveal('.contact_main_sub')
            reveal('.contact_email')
            reveal('.contact_actions')
            reveal('.contact_links li')
        }, section)

        return () => contactCtx.revert()
    }, [])

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch {
            window.location.href = `mailto:${EMAIL}` // fallback if clipboard is blocked
        }
    }

    return (
        <>
            <main className="contact_main" id="contact" ref={compRef}>
                <h1 className="contact_main_heading section_heading">
                    Let’s build something <em>meaningful</em> together.
                </h1>

                <p className="contact_main_sub">
                    I’m always interested in exploring new opportunities, collaborating with developers,
                    and building software that solves real-world problems.
                </p>

                <a className="contact_email" href={`mailto:${EMAIL}`}>{EMAIL}</a>

                <div className="contact_actions">
                    <button type="button" className="contact_btn contact_btn_primary" onClick={copyEmail}>
                        {copied ? 'Copied ✓' : 'Copy email'}
                    </button>

                    {RESUME_URL && (
                        <a className="contact_btn" href={RESUME_URL} target="_blank" rel="noopener noreferrer">
                            Resume <span>↗</span>
                        </a>
                    )}
                </div>

                <span className="contact_copy_status" role="status">
                    {copied ? 'Email copied to clipboard' : ''}
                </span>

                <ul className="contact_links">
                    {LINKS.map((item) => (
                        <li key={item.label}>
                            <a
                                className="contact_link_row"
                                href={item.href}
                                {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                            >
                                <span className="contact_link_label">{item.label}</span>
                                <span className="contact_link_text">{item.text}</span>
                                <span className="contact_link_arrow">↗</span>
                            </a>
                        </li>
                    ))}
                </ul>

            </main>
        </>
    )
}