import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';
import { BrowserRouter } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import backendURI from './webConfig';
const client = new ApolloClient({
  uri: `${backendURI}/graphql`
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <div>
            <Main />
          </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
