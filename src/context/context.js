/**
 * Portfolio React context for providing site data slices
 * (hero, about, projects, contact, footer) to components.
 * Exported: PortfolioProvider, default context.
 */
import React from 'react';

const PortfolioContext = React.createContext();

export const PortfolioProvider = PortfolioContext.Provider;

export default PortfolioContext;
