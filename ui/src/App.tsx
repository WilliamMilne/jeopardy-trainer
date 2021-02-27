import React from 'react';
import './App.scss'

import { Button } from 'carbon-components-react'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import ClueView from './components/ClueView/ClueView';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <ClueView clueId={8}></ClueView>
      </div>
    </ApolloProvider>
  );
}

export default App;
