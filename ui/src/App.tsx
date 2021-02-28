import React from 'react';
import './App.scss'

import { Header, HeaderName } from 'carbon-components-react'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import ClueContainer from './components/ClueContainer/ClueContainer';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache()
});

function switchToNextClue() {
  console.log("hello")
}

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Header aria-label="J-Trainer!">
          <HeaderName href="#" prefix="">
            J-Trainer!
          </HeaderName>
        </Header>
        <div className="body">
          <ClueContainer switchToNextClue={switchToNextClue} clueId={6}></ClueContainer>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
