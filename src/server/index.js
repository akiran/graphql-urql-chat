import express from "express";
import bodyParser from "body-parser";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./schema";
import resolvers from "./resolvers";
import http from "http";
import morgan from "morgan";
const PORT = 8000;

const graphql = new ApolloServer({
  typeDefs,
  resolvers,
  debug: process.env.NODE_ENV !== "production",
  formatError: error => {
    console.log("format error", error);
    return error;
  },
  playground: {
    settings: {
      "request.credentials": false // This is required to allow graphiql to send in cookies. Using cookie to get graphiql work in dev mode
    }
  }
});

const app = express();

app.use(
  morgan(function(tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      JSON.stringify(req.body, null, 2)
    ].join(" ");
  })
);
app.use(bodyParser.json());

graphql.applyMiddleware({ app });
const server = http.createServer(app);
graphql.installSubscriptionHandlers(server);

server.listen(PORT, function() {
  console.log(`Server running on port ${PORT}`);
});
