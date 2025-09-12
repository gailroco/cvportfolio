/**
 * AboutImg: Loads and renders a fixed-size profile image by filename.
 * @param {{alt?: string, filename?: string}} props
 */
import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

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
    render={(data) => {
      const image = data.images.edges.find((n) => n.node.relativePath.endsWith(filename));

      if (!image) return null;

      const imageGatsby = image.node.childImageSharp.gatsbyImageData;
      return <GatsbyImage className="rounded shadow-lg" alt={alt || ''} image={imageGatsby} />;
    }}
  />
);

AboutImg.propTypes = {
  filename: PropTypes.string,
  alt: PropTypes.string,
};

export default AboutImg;
