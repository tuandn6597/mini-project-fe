import ReactDOM from 'react-dom';
import React from 'react';

import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';

const client = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
