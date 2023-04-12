import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// used to process and handle incoming requests
// import axios from 'axios';

// Importing these elements from bootstrap for the application layout
//import { Button, Container, Card, Row } from 'react-bootstrap';

// Import Sass customization file
import './custom.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
