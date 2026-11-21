import React from 'react';
import { Link } from 'gatsby';
import { Container } from 'react-bootstrap';
import Fade from '../transition/in-and-out/Fade';
import 'bootstrap/dist/css/bootstrap.min.css';

import Seo from '../components/Seo';
import '../style/main.scss';

const NotFoundPage = () => {
  return (
    <>
      <section id="hero" className="jumbotron">
        <Container>
          <Fade bottom duration={1000} delay={500} distance="30px">
            <h1 className="hero-title text-center">
              Sorry, this path does not exist{' '}
              <span role="img" aria-label="emoji">
                😞
              </span>
            </h1>
          </Fade>
          <Fade bottom duration={1000} delay={1000} distance="30px">
            <p className="hero-cta justify-content-center">
              <Link className="cta-btn cta-btn--hero" to="/">
                Go back
              </Link>
            </p>
          </Fade>
        </Container>
      </section>
    </>
  );
};

export default NotFoundPage

export const Head = () => <Seo title="Page not found" description="Page not found" />;
