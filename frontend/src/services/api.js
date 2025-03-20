import { gql } from "@apollo/client";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "https://get-better-journal-backend.onrender.com/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});



export const REGISTER_USER = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;


export const GET_USER = gql`
  query GetUser {
    getUser {
      _id
      username
      email
      createdAt
    }
  }
`;

export const GET_JOURNALS = gql`
  query GetJournals {
    getJournals {
      _id
      date
      affirmation
      gratitude
      happiness
      improvement
      tasks
      mood
    }
  }
`;

export const ADD_JOURNAL = gql`
  mutation AddJournal(
    $sleepHours: Int!,
    $mood: Int!,
    $affirmation: String!,
    $gratitude: String!,
    $happiness: String!,
    $improvement: String!,
    $tasks: [String!]!
  ) {
    addJournal(
      sleepHours: $sleepHours,
      mood: $mood,
      affirmation: $affirmation,
      gratitude: $gratitude,
      happiness: $happiness,
      improvement: $improvement,
      tasks: $tasks
    ) {
      _id
      affirmation
      gratitude
      happiness
      improvement
      tasks
      mood
    }
  }
`;

export const EDIT_JOURNAL = gql`
  mutation EditJournal(
    $journalId: ID!,
    $sleepHours: Int!,
    $mood: Int!,
    $affirmation: String!,
    $gratitude: String!,
    $happiness: String!,
    $improvement: String!,
    $tasks: [String!]!
  ) {
    editJournal(
      journalId: $journalId,
      sleepHours: $sleepHours,
      mood: $mood,
      affirmation: $affirmation,
      gratitude: $gratitude,
      happiness: $happiness,
      improvement: $improvement,
      tasks: $tasks
    ) {
      _id
      sleepHours
      mood
      affirmation
      gratitude
      happiness
      improvement
      tasks
    }
  }
`;

export const DELETE_JOURNAL = gql`
  mutation DeleteJournal($journalId: ID!) {
    deleteJournal(journalId: $journalId)
  }
`;