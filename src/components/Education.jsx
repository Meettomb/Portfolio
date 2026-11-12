import React from 'react'
import educationData from '../data/education.json'

export default function Education() {
    const items = educationData.education;

    return (
        <>
            <main className="education_main" id="education">
                <h1 className="education_main_heading">Education.</h1>

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