import React from "react";
import { useQuery } from "urql";
// import gql from "graphql-tag";

const getUsers = `
  {
    users {
      id
      firstName
      lastName
    }
  }
`;
export default function Users() {
  const [res] = useQuery({
    query: getUsers,
    variables: {}
  });

  if (res.fetching) {
    return "Loading...";
  } else if (res.error) {
    return "Oh no!";
  } else if (!res.data.users) {
    return null;
  }

  return (
    <ul>
      {res.data.users.map(({ id, firstName }) => (
        <li key={id}>{firstName}</li>
      ))}
    </ul>
  );
}
