import React from 'react';
import './App.scss'

import { Button, Header, HeaderName } from 'carbon-components-react'
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
        <Header aria-label="J-Trainer!">
          <HeaderName href="#" prefix="">
            J-Trainer!
          </HeaderName>
        </Header>
        <ClueView clueId={6}></ClueView>
      </div>
    </ApolloProvider>
  );
}

export default App;
