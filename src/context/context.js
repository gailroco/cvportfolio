/**
 * Portfolio React context for providing site data slices
 * (hero, about, projects, contact, footer) to components.
 * Exported: PortfolioProvider, PortfolioConsumer, default context.
 */
import React from 'react';

const PortfolioContext = React.createContext();

export const PortfolioProvider = PortfolioContext.Provider;
export const PortfolioConsumer = PortfolioContext.Consumer;

export default PortfolioContext;
