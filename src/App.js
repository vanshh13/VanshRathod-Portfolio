// App.js
import './App.css';
import Navbar from './navbar/navbar';
import Home from './home/home';
import About from './about/about';
import Projects from './project/project';
import Contact from './contact/contact';
import Hobbies from './hobbies/hobbies';
import ArtGallery from './hobbies/ArtGallery';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
      </div>
    </Router>
  );
}

export default App;