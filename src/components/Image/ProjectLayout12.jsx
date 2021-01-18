import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';
import Tilt from 'react-tilt';
import ProjectImg from './ProjectImg';

const ProjectLayout12 = ({ filename, link, cap, enableimg }) => {
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

  if ({ enableimg }) {
    return (
      <Fade right={isDesktop} bottom={isMobile} duration={1000} delay={1000} distance="30px">
        <div className="project-wrapper__image">
          <a
            href={link || '#!'}
            target="_blank"
            aria-label="Project Link"
            rel="noopener noreferrer"
          >
            <Tilt
              options={{
                reverse: false,
                max: 8,
                perspective: 1000,
                scale: 1,
                speed: 300,
                transition: true,
                axis: null,
                reset: true,
                easing: 'cubic-bezier(.03,.98,.52,.99)',
              }}
            >
              <div data-tilt className="thumbnail rounded">
                <ProjectImg alt={cap} filename={filename} />
              </div>
            </Tilt>
          </a>
        </div>
      </Fade>
    );
  }
  return (
    <Fade right={isDesktop} bottom={isMobile} duration={1000} delay={1000} distance="30px">
      <div className="project-wrapper__image">
        <Tilt
          options={{
            reverse: false,
            max: 8,
            perspective: 1000,
            scale: 1,
            speed: 300,
            transition: true,
            axis: null,
            reset: true,
            easing: 'cubic-bezier(.03,.98,.52,.99)',
          }}
        >
          <div data-tilt className="thumbnail rounded">
            <ProjectImg alt={cap} filename={filename} />
          </div>
        </Tilt>
      </div>
    </Fade>
  );
};

ProjectLayout12.propTypes = {
  filename: PropTypes.string,
  link: PropTypes.string,
  cap: PropTypes.string,
  enableimg: PropTypes.bool,
};

export default ProjectLayout12;
