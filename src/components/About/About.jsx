/**
 * About: Bio section with profile image and three paragraphs.
 * Reads content from context and animates with Fade.
 */
import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import PortfolioContext from '../../context/context';

import Title from '../Title/Title';
import AboutImg from '../Image/AboutImg';

import Fade from '../../transition/in-and-out/Fade';
import useDeviceType from '../../hooks/useDeviceType';

const About = () => {
  const { about } = useContext(PortfolioContext);
  const { img, paragraphOne, paragraphTwo, paragraphThree } = about;

  const { isDesktop, isMobile } = useDeviceType();

  return (
    <section id="about">
      <Container>
        <Title title="About Me" />
        <Row className="about-wrapper">
          <Col md={6} sm={12}>
            <Fade bottom duration={1000} delay={600} distance="30px">
              <div className="about-wrapper__image">
              <AboutImg alt="profile picture" filename={img} />
              </div>
            </Fade>
          </Col>
          <Col md={6} sm={12}>
            <Fade left={isDesktop} bottom={isMobile} duration={1000} delay={1000} distance="30px">
              <div className="about-wrapper__info">
                <p className="about-wrapper__info-text">
                  {paragraphOne ||
                    'Lorem ipsum dolor sit, amet consectetur adipisicing elit.'}
                </p>
                <p className="about-wrapper__info-text">
                  {paragraphTwo ||
                    'Lorem ipsum dolor sit, amet consectetur adipisicing elit.'}
                </p>
                <p className="about-wrapper__info-text">
                  {paragraphThree ||
                    'Lorem ipsum dolor sit, amet consectetur adipisicing elit.'}
                </p>
              </div>
            </Fade>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
