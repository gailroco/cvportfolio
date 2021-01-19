import React, { useContext, useEffect, useState } from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import PortfolioContext from '../../context/context';

import Title from '../Title/Title';
import ProjectLayout12 from '../Image/ProjectLayout12';

import Fade from '../../transition/in-and-out/Fade';

const Projects = () => {
  const { projects } = useContext(PortfolioContext);

  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 769) {
      setIsDesktop(true);
      setIsMobile(false);
    } else {
      setIsMobile(true);
      setIsDesktop(false);
    }
  }, []);

  return (
    <section id="projects">
      <Container>
        <div className="project-wrapper">
          <Title title="Projects" />
          {projects.map((project) => {
            const {
              title,
              info,
              info2,
              url,
              repo,
              img1,
              img2,
              link1,
              link2,
              cap1,
              cap2,
              enableimg1,
              enableimg2,
              id,
              urltxt,
            } = project;

            return (
              <Row key={id}>
                <Col lg={4} sm={12}>
                  <Fade left={isDesktop} bottom={isMobile} duration={1000} delay={500} distance="30px">
                    <div className="project-wrapper__text">
                      <h3 className="project-wrapper__text-title">{title || 'Project Title'}</h3>
                      <div>
                        <p>
                          {info ||
                            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi neque, ipsa animi maiores repellendu distinctioaperiam earum dolor voluptatum consequatur blanditiis inventore debitis fuga numquam voluptate architecto itaque molestiae.'}
                        </p>
                        <p className="mb-4">{info2 || ''}</p>
                      </div>
                      {url && (
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cta-btn cta-btn--hero"
                          href={url || '#!'}
                        >
                          {urltxt || 'Know more'}
                        </a>
                      )}
                      {repo && (
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cta-btn text-color-main"
                          href={repo}
                        >
                          Source Code
                        </a>
                      )}
                    </div>
                  </Fade>
                </Col>
                <Col lg={4} sm={12}>
                  <ProjectLayout12 filename={img1} link={link1} alt={cap1} enableimg={enableimg1} />
                </Col>
                <Col lg={4} sm={12}>
                  <ProjectLayout12 filename={img2} link={link2} alt={cap2} enableimg={enableimg2} />
                </Col>
              </Row>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default Projects;
