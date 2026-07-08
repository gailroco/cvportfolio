/**
 * ImageFromQuery: Shared rendering logic for the image StaticQuery
 * components (AboutImg, ProjectImg) — finds the matching file edge
 * by filename and renders it as a GatsbyImage. Not used directly
 * outside this folder; each caller still owns its own graphql query
 * because Gatsby requires the `graphql` tag to be a static literal
 * in the querying file.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { GatsbyImage } from 'gatsby-plugin-image';

const ImageFromQuery = ({ edges, filename, alt, className }) => {
  const image = edges.find((n) => n.node.relativePath.endsWith(filename));

  if (!image) return null;

  const imageGatsby = image.node.childImageSharp.gatsbyImageData;
  return <GatsbyImage className={className} alt={alt || ''} image={imageGatsby} />;
};

ImageFromQuery.propTypes = {
  edges: PropTypes.arrayOf(PropTypes.object).isRequired,
  filename: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
};

export default ImageFromQuery;
