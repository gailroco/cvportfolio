/**
 * ProjectImg: Loads and renders a responsive project image by filename.
 * @param {{alt?: string, filename?: string}} props
 */
import React from 'react';
import PropTypes from 'prop-types';

import { StaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

const ProjectImg = ({ alt, filename }) => (
  <StaticQuery
    query={graphql`
      query {
        images: allFile(filter: { extension: { regex: "/jpeg|jpg|png/i" } }) {
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
    render={(data) => {
      const image = data.images.edges.find((n) => n.node.relativePath.endsWith(filename));

      if (!image) return null;

      const imageGatsby = image.node.childImageSharp.gatsbyImageData;
      return <GatsbyImage alt={alt || ''} image={imageGatsby} />;
    }}
  />
);

ProjectImg.propTypes = {
  filename: PropTypes.string,
  alt: PropTypes.string,
};

export default ProjectImg;
