/**
 * ProjectImg: Loads and renders a responsive project image by filename.
 * @param {{alt?: string, filename?: string}} props
 */
import React from 'react';
import PropTypes from 'prop-types';

import { StaticQuery, graphql } from 'gatsby';

import ImageFromQuery from './ImageFromQuery';

const ProjectImg = ({ alt, filename }) => (
  <StaticQuery
    query={graphql`
      query {
        images: allFile(
          filter: {
            extension: { in: ["jpg", "jpeg", "png", "JPG", "JPEG", "PNG"] }
            relativeDirectory: { eq: "" }
          }
        ) {
          edges {
            node {
              relativePath
              name
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH)
              }
            }
          }
        }
      }
    `}
    render={(data) => (
      <ImageFromQuery edges={data.images.edges} filename={filename} alt={alt} />
    )}
  />
);

ProjectImg.propTypes = {
  filename: PropTypes.string,
  alt: PropTypes.string,
};

export default ProjectImg;
