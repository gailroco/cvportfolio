import React from 'react';
import App from '../components/App';
import Seo from '../components/Seo';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/main.scss';

const IndexPage = () => <App />;

export default IndexPage;

export const Head = () => <Seo path="" />;
