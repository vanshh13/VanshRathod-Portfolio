// App.js
import React, { lazy, Suspense } from 'react';
import './App.css';
import Navbar from './navbar/navbar';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Lazy load components
const Home = lazy(() => import('./home/home'));
const About = lazy(() => import('./about/about'));
const Projects = lazy(() => import('./project/project'));
const Contact = lazy(() => import('./contact/contact'));
const Hobbies = lazy(() => import('./hobbies/hobbies'));
const ArtGallery = lazy(() => import('./hobbies/ArtGallery'));

// Sleek loading fallback matching the portfolio's minimalist black & white theme
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-black text-white">
    <div className="relative w-16 h-16">
      <div className="absolute top-0 left-0 w-full h-full border-4 border-white/10 rounded-full"></div>
      <div className="absolute top-0 left-0 w-full h-full border-4 border-t-white rounded-full animate-spin"></div>
    </div>
  </div>
);

function App() {
  // Define your base path (important for GitHub Pages deployment)
  const basename = "/VanshRathod-Portfolio";

  return (
    // Pass basename to Router
    <Router basename={basename}>
      <div className="App">
        {/* Navbar is outside Routes, so it always renders */}
        {/* Pass the basename to Navbar so it knows the root path for internal links */}
        <Navbar basename={basename} />

        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Route for Art Gallery (a separate page) */}
            {/* Note: The path here should be relative to the basename now, so it's just '/art-gallery' */}
            <Route path="/art-gallery" element={<ArtGallery />} />

            {/* Main portfolio route: All sections rendered together */}
            {/* The main route is simply '/' relative to the basename */}
            <Route
              path="/"
              element={
                <>
                  <Home />
                  <About />
                  <Projects />
                  <Hobbies />
                  <Contact />
                </>
              }
            />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;