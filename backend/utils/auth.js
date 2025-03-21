const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-express");
require("dotenv").config();

module.exports = {

  signToken: (user) => {
    return jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
  },

  authMiddleware: ({ req }) => {
    let token = req.headers.authorization || "";


    if (!token) {
      return { user: null }; 
    }

    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return { user: decoded };   
    } catch (err) {
      throw new AuthenticationError("Invalid or expired token");
    }
  },
};