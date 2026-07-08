/**
 * AboutImg: Loads and renders a fixed-size profile image by filename.
 * @param {{alt?: string, filename?: string}} props
 */
import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import ImageFromQuery from './ImageFromQuery';

const AboutImg = ({ alt, filename }) => (
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
                gatsbyImageData(layout: FIXED, width: 192)
              }
            }
          }
        }
      }
    `}
    render={(data) => (
      <ImageFromQuery
        edges={data.images.edges}
        filename={filename}
        alt={alt}
        className="rounded shadow-lg"
      />
    )}
  />
);

AboutImg.propTypes = {
  filename: PropTypes.string,
  alt: PropTypes.string,
};

export default AboutImg;
