require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const cors = require("cors");
const { authMiddleware } = require("./utils/auth");

const typeDefs = require("./schemas/typeDefs");
const resolvers = require("./schemas/resolvers");

const app = express();

app.use(cors());
app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => authMiddleware({ req }),
});

const startServer = async () => {
  try {
    await server.start();
    server.applyMiddleware({ app });

    require("./config/connection");

   

    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}/graphql`);
    });
  } catch (err) {
    console.error("❌ Server Error:", err.message);
    process.exit(1);
  }
};

startServer();