import './App.css';
import Navbar from './navbar/navbar';
import Home from './home/home';
import About from './about/about';
import Projects from './project/project';
import Contact from './contact/contact';
import Hobbies from './hobbies/hobbies';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {
  return (
    <div className='App'>
    <Navbar />
    {/* <section id="home">Home Section</section> */}
    <Home />
    {/* <section id="about">About Section</section> */}
    <About />
    {/* <section id="projects">Projects Section</section> */}
    <Projects/>
    <Hobbies/>
    {/* <section id="contact">Contact Section</section> */}
    <Contact/>
  </div>
  );
}

export default App;
