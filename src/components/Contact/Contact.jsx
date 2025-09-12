/**
 * Contact: Call-to-action section with mailto link.
 * Reads cta/button text and email from context.
 */
import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';

import Fade from '../../transition/in-and-out/Fade';
import PortfolioContext from '../../context/context';

import Title from '../Title/Title';
import useDeviceType from '../../hooks/useDeviceType';

const Contact = () => {
  const { contact } = useContext(PortfolioContext);
  const { cta, btn, email } = contact;
  useDeviceType();

  return (
    <section id="contact">
      <Container>
        <Title title="Contact" />
        <Fade bottom duration={1000} delay={800} distance="30px">
          <div className="contact-wrapper">
            <p className="contact-wrapper__text">
              {cta}
            </p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn cta-btn--resume"
              href={email ? `mailto:${email}` : 'user@mail.com'}
            >
              {btn || "Let's Talk"}
            </a>
          </div>
        </Fade>
      </Container>
    </section>
  );
};

export default Contact;
