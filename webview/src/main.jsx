import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';


const client = new ApolloClient({
  // FIXME: CORS; may need a new approach
  uri: import.meta.env.VITE_APP_ATLAS_GRAPHQL_ENDPOINT || 'https://symphony-api.clearlabs.biblica.com/graphql/',
  cache: new InMemoryCache(),
});
ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
)
