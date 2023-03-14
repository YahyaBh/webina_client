import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import AuthUser from './Front_side/context/AuthUser';

const { http } = AuthUser();

const [active, setActive] = useState(true);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(



  < BrowserRouter >

useEffect(() => {
      http.post('/api/website/status')
        .then(response => {
          if (response.data.status === 'active') {
            setActive(true);
          } else {
            setActive(false);
          }
        })
    })

    {
      active ?
        <App />
        : 'Website is not active'}

  </ BrowserRouter>
);

