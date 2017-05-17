import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import api from 'config/api'
import WidgetRenderer from 'WidgetRenderer'

const networkInterface = createNetworkInterface({ uri: api.graphcool.simple })

const client = new ApolloClient({
  networkInterface,
})

const store = createStore(
  combineReducers({
    apollo: client.reducer(),
  }),
  {}, // initial state
  composeWithDevTools(
    applyMiddleware(client.middleware()),
  ),
)

class App extends Component {

  render() {
    return (
      <ApolloProvider store={store} client={client}>
        <WidgetRenderer />
      </ApolloProvider>
    );
  }
}

export default App;
