import './App.scss'

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Navigation from './components/Navigation/Navigation';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache()
});

function App() {
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
