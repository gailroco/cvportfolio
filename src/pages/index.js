import React from 'react';
import App from '../components/App';
import { headData } from '../mock/data';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/main.scss';

const IndexPage = () => {
    const { title, lang, description } = headData;

    return (
      <App>
        <meta charSet="utf-8" />
        <title>{title || 'Gatsby Simple portfolio'}</title>
        <html lang={lang || 'en'} />
        <meta name="description" content={description || 'Gatsby Simple portfolio'} />
      </App>
    )
  }

  export default IndexPage
