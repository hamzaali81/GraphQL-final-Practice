import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import client from './Config/gql_config';
import Book from './Component/Book';

console.log(client);

function App() {
  return (
    <ApolloProvider client={client}>
    <div className="App">
      <h1>App</h1>
      <Book />
    </div>
  </ApolloProvider>
  );
}

export default App;
