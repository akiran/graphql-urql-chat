import React, { Component } from "react";
import "./App.css";
import { Provider, createClient } from "urql";
import Chat from "./Chat";

const client = createClient({
  url: "http://localhost:8000/graphql"
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
