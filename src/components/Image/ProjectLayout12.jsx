/**
 * ProjectLayout12: Image tile with optional link and tilt effect.
 * The tilt is skipped when the user prefers reduced motion.
 * @param {Object} props
 * @param {string} [props.filename] - image filename in src/images
 * @param {string} [props.link] - optional external link to wrap image
 * @param {string} [props.cap] - alt text/caption for accessibility
 * @param {string} [props.linklabel] - accessible name for the image link
 * @param {boolean} [props.enableimg] - whether to render the image/link block
 */
import React from 'react';
import { Tilt } from 'react-tilt';
import PropTypes from 'prop-types';

import ProjectImg from './ProjectImg';

import Fade from '../../transition/in-and-out/Fade';
import useDeviceType from '../../hooks/useDeviceType';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

const ProjectLayout12 = ({ filename, link, cap, linklabel, enableimg }) => {
  const { isDesktop, isMobile } = useDeviceType();
  const prefersReducedMotion = usePrefersReducedMotion();

  const thumbnail = (
    <div data-tilt className="thumbnail rounded">
      <ProjectImg alt={cap} filename={filename} />
    </div>
  );

  const tilt = prefersReducedMotion ? (
    thumbnail
  ) : (
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
      {thumbnail}
    </Tilt>
  );

  return (
    <Fade right={isDesktop} bottom={isMobile} duration={1000} delay={1000} distance="30px">
      <div className="project-wrapper__image">
        {enableimg ? (
          <a
            href={link || '#!'}
            target="_blank"
            aria-label={linklabel || undefined}
            rel="noopener noreferrer"
          >
            {tilt}
          </a>
        ) : (
          tilt
        )}
      </div>
    </Fade>
  );
};

ProjectLayout12.propTypes = {
  filename: PropTypes.string,
  link: PropTypes.string,
  cap: PropTypes.string,
  linklabel: PropTypes.string,
  enableimg: PropTypes.bool,
};

export default ProjectLayout12;
