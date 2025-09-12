/**
 * ProjectLayout12: Image tile with optional link and tilt effect.
 * @param {Object} props
 * @param {string} [props.filename] - image filename in src/images
 * @param {string} [props.link] - optional external link to wrap image
 * @param {string} [props.cap] - alt text/caption for accessibility
 * @param {boolean} [props.enableimg] - whether to render the image/link block
 */
import React from 'react';
import { Tilt } from 'react-tilt';
import PropTypes from 'prop-types';

import ProjectImg from './ProjectImg';

import Fade from '../../transition/in-and-out/Fade';
import useDeviceType from '../../hooks/useDeviceType';

const ProjectLayout12 = ({ filename, link, cap, enableimg }) => {
  const { isDesktop, isMobile } = useDeviceType();

  if (enableimg) {
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
                max: 35,
                perspective: 1000,
                scale: 1,
                speed: 2000,
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
            max: 35,
            perspective: 1000,
            scale: 1,
            speed: 2000,
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
