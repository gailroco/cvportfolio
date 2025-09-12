/**
 * Title: Section heading with a simple Fade-in animation.
 * @param {{title: string}} props
 */
import React from 'react';
import PropTypes from 'prop-types';

import Fade from '../../transition/in-and-out/Fade';

const Title = ({ title }) => (
  <Fade bottom duration={1000} delay={300} distance="0px">
    <h2 className="section-title">{title}</h2>
  </Fade>
);

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Title;
