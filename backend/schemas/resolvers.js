const User = require("../models/User");
const Journal = require("../models/Journal");
const { AuthenticationError } = require("apollo-server-express");
const getQuote = require("../services/quoteService"); 
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

const resolvers = {
  Query: {
    getUser: async (_, __, context) => {
      if (!context.user) {
        throw new AuthenticationError("Not authenticated");
      }
      return await User.findById(context.user.id);
    },

    getJournals: async (_, __, context) => {
      if (!context.user) {
        throw new AuthenticationError("Not authenticated");
      }
      const journals = await Journal.find({ user: context.user.id }).sort({ date: -1 });
      return journals.map(journal => ({
        ...journal._doc,
        date: new Date(journal.date).toLocaleDateString("en-US", {
          timeZone: "America/Los_Angeles" 
        })
      }));
    },
  },

  Mutation: {
    register: async (_, { username, email, password }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("User already exists");
      }
      const user = await User.create({ username, email, password });
      const token = generateToken(user);
      return { token, user };
    },

    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user || user.password !== password) {
        throw new AuthenticationError("Invalid credentials");
      }
      const token = generateToken(user);
      return { token, user };
    },

    addJournal: async (
      _,
      { sleepHours, mood, affirmation, gratitude, tasks, happiness, improvement },
      context
    ) => {
      if (!context.user) {
        throw new AuthenticationError("Not authenticated");
      }
      try {
        const quote = await getQuote();

        const newJournal = await Journal.create({
          user: context.user.id,
          sleepHours,
          mood,
          affirmation,
          gratitude,
          tasks,
          happiness,
          improvement,
          quote, 
        });

        return newJournal;
      } catch (err) {
        throw new AuthenticationError("Invalid token");
      }
    },

    editJournal: async (
      _,
      { journalId, sleepHours, mood, affirmation, gratitude, tasks, happiness, improvement },
      context
    ) => {
      if (!context.user) {
        throw new AuthenticationError("Not authenticated");
      }
      try {
        const updatedJournal = await Journal.findOneAndUpdate(
          { _id: journalId, user: context.user.id }, 
          { sleepHours, mood, affirmation, gratitude, tasks, happiness, improvement },
          { new: true } 
        );
        if (!updatedJournal) {
          throw new Error("Journal not found or unauthorized");
        }
        return {
          ...updatedJournal._doc,
          date: new Date(updatedJournal.date).toLocaleDateString("en-US", {
            timeZone: "America/Los_Angeles" 
          })
        };
      } catch (err) {
        throw new AuthenticationError("Invalid token");
      }
    },

    deleteJournal: async (_, { journalId }, context) => {
      if (!context.user) {
        throw new AuthenticationError("Not authenticated");
      }
      try {
        const journal = await Journal.findOneAndDelete({ _id: journalId, user: context.user.id });
        if (!journal) {
          throw new Error("Journal not found or unauthorized");
        }
        return "Journal deleted successfully";
      } catch (err) {
        throw new AuthenticationError("Invalid token");
      }
    },
  },
};

module.exports = resolvers;