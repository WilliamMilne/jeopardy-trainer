import React, { useState } from 'react';
import './App.scss'

import { Header, HeaderName } from 'carbon-components-react'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import ClueContainer from './components/ClueContainer/ClueContainer';
import Navigation from './components/Navigation/Navigation';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache()
});

function App() {
  let [clueId, setClueId] = useState(4);
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Navigation></Navigation>

      </div>
    </ApolloProvider>
  );
}

// <div className="body">
// <ClueContainer key={clueId} switchToNextClue={() => setClueId(clueId + 1)} clueId={clueId}></ClueContainer>
// </div>

export default App;
