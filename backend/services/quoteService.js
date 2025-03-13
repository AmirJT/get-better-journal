const fetch = require("node-fetch");

const getQuote = async () => {
  try {
    const response = await fetch("https://zenquotes.io/api/random");
    const data = await response.json();
    return data[0].q; 
  } catch (error) {
    console.error("Error fetching quote:", error);
    return "Keep pushing forward. Every day is a new opportunity."; 
  }
};

module.exports = getQuote;