import './style/index.css';

import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import CustomCursor from './components/CustomCursor';
import SmoothScroll from './components/SmoothScroll';

import { BrowserRouter } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <SmoothScroll />

            <CustomCursor />
            <Header />

            <div id="smooth-wrapper">
                <div id="smooth-content">
                    <Hero />
                    <About />
                    {/* Add Skills, Projects, Experience and Contact here */}
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;