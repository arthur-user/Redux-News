import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";

import App from './App';
import store from './app/store';
import { worker } from '../mocks/browser';
import './index.css';

const root = createRoot(document.getElementById('root'));

async function prepare() {
  if (import.meta.env.DEV) {
    await worker.start({

      onUnhandledRequest: 'bypass',
      serviceWorker: {
        url: '/mockServiceWorker.js'
  }
    });
  }
}

prepare().then(() => {
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
});
