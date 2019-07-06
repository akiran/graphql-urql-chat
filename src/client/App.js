import React, { Component } from "react";
import { SubscriptionClient } from "subscriptions-transport-ws";
import "./App.css";
import {
  // cacheExchange,
  // debugExchange,
  // fetchExchange,
  Provider,
  createClient,
  defaultExchanges,
  subscriptionExchange
} from "urql";
import Chat from "./Chat";

const subscriptionClient = new SubscriptionClient(
  "ws://localhost:8000/graphql",
  {}
);

const client = createClient({
  url: "http://localhost:8000/graphql",
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: operation => subscriptionClient.request(operation)
    })
  ]
});

class App extends Component {
  render() {
    return (
      <Provider value={client}>
        <Chat />
      </Provider>
    );
  }
}

export default App;
