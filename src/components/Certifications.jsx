import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import certificates from '../data/certificates.json'

gsap.registerPlugin(ScrollTrigger)

export default function Certifications() {
  const compRef = useRef(null)

  useLayoutEffect(() => {
    const section = compRef.current
    if (!section) return

    const certificationsCtx = gsap.context(() => {
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

      reveal('.certifications_heading')
      reveal('.certification_item')
    }, section)

    return () => certificationsCtx.revert()
  }, [])

  return (
    <>
      <main className="certifications_main" id="certifications" ref={compRef}>
        <h1 className="certifications_heading">Certifications.</h1>

        <section className="certifications_list">
          {certificates.map((cert, index) => (
            <article
              key={cert.id}
              className={`certification_item${cert.type === 'Specialization' ? ' certification_item_special' : ''}`}
            >
              <div className="certification_top">
                <span className="certification_number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="certification_type">{cert.type}</span>
              </div>

              <h2 className="certification_title">{cert.title}</h2>

              <div className="certification_info">
                <p className="certification_issuer">{cert.issuer}</p>
                <p className="certification_issued">Issued {cert.issued}</p>
                <p className="certification_id">ID: {cert.credentialId}</p>
              </div>

              <a
                className="certification_btn"
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View credential for ${cert.title}`}
              >
                View credential <span>↗</span>
              </a>
            </article>
          ))}
        </section>
      </main>
    </>
  )
}