import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import InteractiveCharacter from "../components/InteractiveCharacter"; 
import "../styles/home.css";
import Lottie from "lottie-react";

const Home = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [fade, setFade] = useState("fade-in");
  const [name, setName] = useState("");
  const [aiResponse, setAiResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const conversation = useMemo(() => [
    "Hey, welcome to Get Better 1% Every Day!",
    "I’ll show you how to write journals and improve daily.",
    "First, let’s get to know you! What’s your name?"
  ], []);

  const questions = [
    { id: "morning_feeling", text: "How do you feel in the morning?", options: ["Energetic", "Neutral", "Tired", "Anxious"] },
    { id: "gratitude", text: "What’s something you’re grateful for today?", options: ["Health", "Family", "Career", "New experiences"] },
    { id: "motivation", text: "What keeps you motivated?", options: ["Setting goals", "Reading", "Listening to podcasts", "I struggle with motivation"] },
    { id: "challenge_response", text: "How do you deal with setbacks?", options: ["Reflect & learn", "Seek advice", "Take a break", "I feel stuck"] },
    { id: "habit_to_improve", text: "Which habit do you want to improve?", options: ["Waking up early", "Consistency", "Better focus", "Mindfulness"] },
    { id: "bad_day_handling", text: "How do you recover from bad days?", options: ["Write it down", "Meditate", "Talk to someone", "Try to ignore it"] },
    { id: "happiness_source", text: "What makes you happiest?", options: ["Progress", "Loved ones", "Creativity", "Helping others"] },
    { id: "daily_planning", text: "How do you plan your day?", options: ["To-do lists", "Spontaneously", "Apps", "I don’t plan much"] },
    { id: "desired_feeling", text: "How do you want to feel at night?", options: ["Accomplished", "Peaceful", "Inspired", "Grateful"] },
    { id: "life_improvement", text: "What’s one thing you want to improve?", options: ["Time management", "Self-confidence", "Work-life balance", "Emotional resilience"] }
  ];

  const [lottieData, setLottieData] = useState(null);

  useEffect(() => {
    fetch("/loadingAnimation.json")
      .then((res) => res.json())
      .then((data) => setLottieData(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    setFade("fade-in");

    if (step < conversation.length - 1) {
      const timer = setTimeout(() => {
        setFade("fade-out");
        setTimeout(() => {
          setStep(step + 1);
          setFade("fade-in");
        }, 500);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [step, conversation]);

  const handleAnswer = (option) => {
    if (step === 2) {
      if (name.trim() === "") return;
      setStep(step + 1);
    } else {
      setAnswers({ ...answers, [questions[step - conversation.length].id]: option });

      if (step - conversation.length < questions.length - 1) {
        setStep(step + 1);
      } else {
        setLoading(true);
        setTimeout(fetchAIResponse, 3000);
      }
    }
  };

  const fetchAIResponse = async () => {
    const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

    if (!API_KEY) {
      setAiResponse("⚠️ OpenAI API Key is missing. Please try again later.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: `Generate a concise journaling guide for ${name} based on their answers. Each journal section must be exactly one sentence. Format it into bullet points. The sections should include: 
                - Mood: One sentence on how their morning feeling affects their day.
                - Affirmation: One short empowering statement they should use.
                - Gratitude: One sentence on what they should appreciate daily.
                - Important Tasks: One sentence on how to plan tasks for success.
                - Happiness Reflection: One sentence on how to reflect on joy.
                - Self-Improvement: One sentence on what to improve for tomorrow.`
            },
            {
              role: "user",
              content: JSON.stringify(answers)
            }
          ],
          max_tokens: 150
        })
      });

      const data = await response.json();
      setAiResponse(data.choices[0]?.message?.content || "⚠️ AI response failed. Try again.");
    } catch {
      setAiResponse("⚠️ An error occurred while generating your journaling guide.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <div className="character-container">
        <InteractiveCharacter />
      </div>

      <div className="chat-container">
        <div className={`chat-bubble ${fade}`}>
          {loading ? (
            <div className="loading-container">
              <p><strong>{name}</strong>, we are working on it! Getting you started with the best understanding of how to write your daily journals to get better 1% every day...</p>
              {lottieData && (
                <Lottie
                  animationData={lottieData}
                  loop
                  autoplay
                  style={{ width: "150px", height: "150px", marginTop: "20px" }}
                />
              )}
            </div>
          ) : aiResponse ? (
            <>
              <p><strong>{name}</strong>, here’s your quick daily journal guide:</p>
              <ul>
                {aiResponse.split("\n").map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>

              <div className="cta-container">
                <p>✨ Now that you know how to write your journals, let’s begin! ✨</p>
                <div className="cta-buttons">
                  <button className="signup" onClick={() => navigate("/register")}>Sign Up</button>
                  <button className="login" onClick={() => navigate("/login")}>Log In</button>
                </div>
              </div>
            </>
          ) : step === 2 ? (
            <>
              <p>{conversation[step]}</p>
              <input
                type="text"
                className="name-input"
                placeholder="Enter your name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button onClick={() => handleAnswer()}>Continue</button>
            </>
          ) : step < conversation.length ? (
            <p>{conversation[step]}</p>
          ) : (
            <>
              <p>{questions[step - conversation.length].text}</p>
              <div className="options">
                {questions[step - conversation.length].options.map((option, index) => (
                  <button key={index} onClick={() => handleAnswer(option)}>{option}</button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;