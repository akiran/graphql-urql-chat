import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "urql";
import uuid from "uuid";

export default function MessageInput() {
  const [text, setText] = useState("");
  const [res, executeMutation] = useMutation(addMessageMutation);
  async function addMessage(e) {
    if (!text) {
      return;
    }
    if (e.key === "Enter") {
      console.log("send");
      const newID = uuid.v4();
      await executeMutation({
        text,
        id: newID
      });
      setText("");
    }
  }
  return (
    <div>
      <input
        className="form-control"
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={addMessage}
      />
    </div>
  );
}

const addMessageMutation = gql`
  mutation addMessageMutation($id: ID!, $text: String!) {
    addMessage(id: $id, text: $text) {
      id
      text
    }
  }
`;
