/**
 * Seo: document head tags (title, description, canonical URL, Open
 * Graph and Twitter card) for a page's Gatsby Head export. Defaults
 * come from headData in src/data/data.js.
 */
import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { headData } from '../data/data';
import profileImage from '../images/profile.jpg';

function Seo({ title, description, path }) {
  const { site } = useStaticQuery(graphql`
    query SeoSiteUrl {
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `);

  // Gatsby strips the trailing slash from siteUrl. Without it, page
  // paths would resolve against the parent folder instead of the site.
  const siteUrl = site.siteMetadata.siteUrl.replace(/\/?$/, '/');
  const pageTitle = title || headData.title;
  const pageDescription = description || headData.description;
  // The imported image path already carries the path prefix, so only
  // the origin is prepended.
  const imageUrl = new URL(profileImage, siteUrl).href;
  const pageUrl = path === undefined ? null : new URL(path, siteUrl).href;

  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      {pageUrl && <link rel="canonical" href={pageUrl} />}

      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={imageUrl} />
      {pageUrl && <meta property="og:url" content={pageUrl} />}

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={imageUrl} />
    </>
  );
}

export default Seo;
