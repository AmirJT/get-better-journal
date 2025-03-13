const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
  }

  type Journal {
    _id: ID!
    user: ID!
    date: String!
    sleepHours: Int!
    mood: Int!
    affirmation: String!
    gratitude: String!
    tasks: [String!]!
    happiness: String!
    improvement: String!
    quote: String!
  }

  type Auth {
    token: String!
    user: User!
  }

  type Query {
    getJournals: [Journal] # Fetch all journals (Only for the logged-in user)
    getUser: User # Fetch logged-in user details
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addJournal(
      sleepHours: Int!,
      mood: Int!,
      affirmation: String!,
      gratitude: String!,
      tasks: [String!]!,
      happiness: String!,
      improvement: String!,
      quote: String
    ): Journal

    editJournal(
      journalId: ID!,
      sleepHours: Int!,
      mood: Int!,
      affirmation: String!,
      gratitude: String!,
      tasks: [String!]!,
      happiness: String!,
      improvement: String!
    ): Journal

    deleteJournal(journalId: ID!): String
  }
`;

module.exports = typeDefs;