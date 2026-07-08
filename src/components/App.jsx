/**
 * App: Root layout that composes the portfolio sections and
 * provides content via PortfolioProvider from src/data/data.js.
 */
import React from 'react';

import { PortfolioProvider } from '../context/context';

import Hero from './Hero/Hero';
import About from './About/About';
import Projects from './Projects/Projects';
import Contact from './Contact/Contact';
import Footer from './Footer/Footer';

import { heroData, aboutData, projectsData, contactData, footerData } from '../data/data';

function App() {
  return (
    <PortfolioProvider
      value={{
        hero: heroData,
        about: aboutData,
        projects: projectsData,
        contact: contactData,
        footer: footerData,
      }}
    >
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </PortfolioProvider>
  );
}

export default App;
