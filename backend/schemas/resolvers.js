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
    
      try {
        console.log("Fetching user data for user ID:", context.user.id); 
    
        const user = await User.findById(context.user.id);
        if (!user) {
          throw new Error("User not found in database");
        }
    
        if (!user.createdAt) {
          user.createdAt = new Date(); 
          await user.save(); 
        }
    
        // Fetch user's journal data
        const journals = await Journal.find({ user: context.user.id });
    
        const totalEntries = journals.length;
        const moodAverage = totalEntries > 0 
          ? (journals.reduce((sum, j) => sum + j.mood, 0) / totalEntries).toFixed(2) 
          : "N/A";
    
        console.log("User found:", user.username, "| Total Journals:", totalEntries); 
    
        return {
          _id: user._id,
          username: user.username,
          email: user.email,
          profileImage: user.profileImage || "https://via.placeholder.com/150", 
          createdAt: user.createdAt ? user.createdAt.toISOString() : new Date().toISOString(), 
          totalEntries,
          moodAverage
        };
      } catch (err) {
        console.error("❌ Error fetching user data:", err); 
        throw new Error("Failed to fetch user data");
      }
    },
  

    getJournals: async (_, __, context) => {
      if (!context.user) {
        throw new AuthenticationError("Not authenticated");
      }
      try {
        const journals = await Journal.find({ user: context.user.id }).sort({ createdAt: -1 });

        return journals.map(journal => ({
          ...journal._doc,
          date: journal.createdAt.toISOString().split("T")[0] 
        }));
      } catch (err) {
        console.error("Error fetching journals:", err);
        throw new Error("Failed to fetch journals");
      }
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
          createdAt: new Date() 
        });

        return {
          ...newJournal._doc,
          date: newJournal.createdAt.toISOString().split("T")[0] 
        };
      } catch (err) {
        console.error("Error adding journal:", err);
        throw new Error("Failed to add journal");
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
          date: updatedJournal.createdAt.toISOString().split("T")[0] 
        };
      } catch (err) {
        console.error("Error updating journal:", err);
        throw new Error("Failed to update journal");
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
        console.error("Error deleting journal:", err);
        throw new Error("Failed to delete journal");
      }
    },

    updateProfileImage: async (_, { imageUrl }, context) => {
      if (!context.user) {
        throw new AuthenticationError("Not authenticated");
      }
    
      try {
        const updatedUser = await User.findByIdAndUpdate(
          context.user.id,
          { profileImage: imageUrl }, // ✅ Update profileImage field
          { new: true }
        );
    
        return updatedUser;
      } catch (err) {
        console.error("Error updating profile image:", err);
        throw new Error("Failed to update profile image");
      }
    },
  },
};

module.exports = resolvers;