import React from "react";
import gql from "graphql-tag";
import { useQuery, useSubscription } from "urql";

export default function Messages() {
  const [res, fetchMessages] = useQuery({
    query: messagesQuery
  });

  const [subscriptionResult] = useSubscription(
    { query: messageSubscription },
    handleSubscription
  );

  function handleSubscription(messages, response) {
    fetchMessages({ requestPolicy: "network-only" });
  }
  if (res.fetching) {
    return "Loading...";
  } else if (res.error) {
    return "Oh no!";
  } else if (!res.data.messages) {
    return null;
  }

  return (
    <ul>
      {res.data.messages.map(({ id, text }) => (
        <li key={id}>{text}</li>
      ))}
    </ul>
  );
}

const messagesQuery = gql`
  {
    messages {
      id
      text
    }
  }
`;

const messageSubscription = gql`
  subscription {
    onNewMessage {
      id
      text
    }
  }
`;
