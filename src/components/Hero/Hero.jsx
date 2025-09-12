/**
 * Hero: Top section with title, name, subtitle and CTA.
 * Uses react-scroll to link to the About section.
 */
import React, { useContext } from 'react';

import { Container } from 'react-bootstrap';
import { Link } from 'react-scroll';

import Fade from '../../transition/in-and-out/Fade';
import PortfolioContext from '../../context/context';
import useDeviceType from '../../hooks/useDeviceType';

const Head = () => {
  const { hero } = useContext(PortfolioContext);
  const { title, name, subtitle, cta } = hero;

  const { isDesktop, isMobile } = useDeviceType();

  return (
    <section id="hero" className="jumbotron">
      <Container>
        <Fade left={isDesktop} bottom={isMobile} duration={1000} delay={500} distance="30px">
          <h1 className="hero-title">
            {title}{' '}
            <span className="text-color-main">{name}</span>
            <br />
            {subtitle}
          </h1>
        </Fade>
        <Fade left={isDesktop} bottom={isMobile} duration={1000} delay={1000} distance="30px">
          <p className="hero-cta">
            <span className="cta-btn cta-btn--hero">
              <Link to="about" smooth duration={1000}>
                {cta || "Know more"}
              </Link>
            </span>
          </p>
        </Fade>
      </Container>
    </section>
  );
};

export default Head;
