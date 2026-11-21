/**
 * Sets the document language on <html>. Gatsby 5 page Head exports
 * cannot set attributes on <html>, so it is done here instead.
 */
import { headData } from './src/data/data';

export const onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: headData.lang || 'en' });
};
