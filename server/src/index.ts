import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { __prod__ } from "./constants";
import { EmployeeResolver } from "./resolvers/employee";
import { ShiftResolver } from "./resolvers/shift";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";

const main = async () => {
  const RedisStore = connectRedis(session);
  const redis = new Redis();
  const app = express();

  // enable cors
  const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true, // <-- REQUIRED backend setting
  };
  app.use(cors(corsOptions));

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [EmployeeResolver, ShiftResolver],
      validate: false,
    }),
    plugins: __prod__
      ? undefined
      : [ApolloServerPluginLandingPageGraphQLPlayground()],
    context: ({ req, res }) => ({
      req,
      res,
      redis,
    }),
  });

  await createConnection();

  app.use(
    session({
      name: "qid",
      store: new RedisStore({ client: redis, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: false,
        sameSite: "lax",
        secure: false,
      },
      saveUninitialized: false,
      secret: "sdfgoirsjvnldkfsuif",
      resave: true,
    })
  );

  await server.start();

  server.applyMiddleware({ app, cors: false });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

main().catch((err) => {
  console.error(err);
});
