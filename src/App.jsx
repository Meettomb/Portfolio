
import React, { useEffect, useState } from 'react';
import './style/index.css';

import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import CustomCursor from './components/CustomCursor';
import SmoothScroll from './components/SmoothScroll';
import Loader from './components/Loader';
import Journey from './components/Journey';
import Projets from './components/Projets';
import TechnicalSkills from './components/TechnicalSkills';
import Education from './components/Education';
import Certifications from './components/Certifications'

import { BrowserRouter } from 'react-router-dom';

function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadWebsite = async () => {

            // Wait for browser resources
            await new Promise((resolve) => {
                if (document.readyState === 'complete') {
                    resolve();
                } else {
                    window.addEventListener('load', resolve, { once: true });
                }
            });

            // Wait for all images
            const images = Array.from(document.images);

            images.forEach((img) => {
                img.loading = 'eager';
            });

            await Promise.all(
                images.map(async (img) => {
                    if (!img.complete) {
                        await new Promise((resolve) => {
                            img.addEventListener('load', resolve, { once: true });
                            img.addEventListener('error', resolve, { once: true });
                        });
                    }

                    if (img.decode) {
                        await img.decode().catch(() => {});
                    }
                })
            );

            // Wait for custom fonts
            if (document.fonts) {
                await document.fonts.ready;
            }

            // Hide loader
            setIsLoading(false);
        };

        loadWebsite();
    }, []);

    return (
        <BrowserRouter className="App">
            {isLoading && <Loader />}

            <SmoothScroll />

            <CustomCursor />
            <Header />

            <div id="smooth-wrapper">
                <div id="smooth-content">
                    <Hero />
                    <About />
                    <Journey />
                    <Projets />
                    <TechnicalSkills/>
                    <Education/>
                    <Certifications/>
                    {/* Add Skills, Projects, Experience and Contact here */}
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
