import React from "react";
import gql from "graphql-tag";
import { useQuery } from "urql";

export default function Messages() {
  const [res] = useQuery({
    query: messagesQuery
  });

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

// export class Messages extends React.Component {
//   componentDidMount() {
//     this.props.subscribeToNewMessage();
//   }
//   render() {
//     console.log(this.props);
//     const { data: { messages, loading } } = this.props;
//     if (loading) {
//       return <div>Loading messages ...</div>;
//     }
//     return (
//       <div>
//         {messages.map(message => <div key={message.id}>{message.text}</div>)}
//       </div>
//     );
//   }
// }

const messagesQuery = gql`
  {
    messages {
      id
      text
    }
  }
`;

const messageSubscribe = gql`
  subscription {
    onNewMessage {
      id
      text
    }
  }
`;

// export default graphql(messagesQuery, {
//   props: props =>
//     Object.assign({}, props, {
//       subscribeToNewMessage: params => {
//         console.log(props);
//         return props.data.subscribeToMore({
//           document: messageSubscribe,
//           updateQuery: (prev, { subscriptionData }) => {
//             console.log("subscribed data", subscriptionData);
//             if (!subscriptionData.data) {
//               return prev;
//             }
//             const newMessage = subscriptionData.data.onNewMessage;
//             console.log(newMessage, prev.messages);
//             if (prev.messages.find(message => message.id === newMessage.id)) {
//               return prev;
//             }
//             return Object.assign({}, prev, {
//               messages: [...prev.messages, newMessage]
//             });
//           }
//         });
//       }
//     })
// })(Messages);
