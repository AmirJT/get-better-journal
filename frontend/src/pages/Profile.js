import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import "../styles/zenportal.css";

const AVATAR_PATH = "/Animation - 1742540918283.json";
const BREATH_ANIMATION_PATH = "/Animation - 1742594868700.json";

const durations = {
  "30s": 30,
  "1m": 60,
  "5m": 300,
};

const localTracks = [
  { title: "Finding Myself 🧘", url: "/mixkit-finding-myself-993.mp3" },
  { title: "Relax Beat 🎵", url: "/mixkit-relax-beat-292.mp3" },
  { title: "Romantic Vibes 💖", url: "/mixkit-romantic-05-759.mp3" },
  { title: "Serene View 🌅", url: "/mixkit-serene-view-443.mp3" },
  { title: "Spirit in the Woods 🌲", url: "/mixkit-spirit-in-the-woods-139.mp3" },
  { title: "Spiritual Moment ✨", url: "/mixkit-spiritual-moment-525.mp3" },
  { title: "Valley Sunset 🌄", url: "/mixkit-valley-sunset-127.mp3" },
  { title: "Yoga Flow 🧘‍♂️", url: "/mixkit-yoga-song-444.mp3" }
];

const Profile = () => {
  const [avatarData, setAvatarData] = useState(null);
  const [breathAnimation, setBreathAnimation] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTime, setSelectedTime] = useState("1m");
  const [enableVoice, setEnableVoice] = useState(false);
  const [guidanceStep, setGuidanceStep] = useState(0);

  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  useEffect(() => {
    fetch(AVATAR_PATH)
      .then((res) => res.json())
      .then((data) => setAvatarData(data))
      .catch((err) => console.error("Failed to load avatar", err));

    fetch(BREATH_ANIMATION_PATH)
      .then((res) => res.json())
      .then((data) => setBreathAnimation(data))
      .catch((err) => console.error("Failed to load breath animation", err));
  }, []);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  const handleStart = () => {
    setTimeLeft(durations[selectedTime]);
    setIsRunning(true);
    setGuidanceStep(0); 
  };

  const handleMusicSelect = (track) => {
    setCurrentTrack(track);
    setTimeout(() => {
      const audio = document.getElementById("meditation-audio");
      if (audio) {
        audio.play().then(() => {
          setIsPlayingMusic(true);
        }).catch((err) => {
          console.error("Autoplay blocked:", err);
        });
      }
    }, 200);
  };

  const toggleMusic = async () => {
    const audio = document.getElementById("meditation-audio");
    if (!audio) return;

    try {
      if (audio.paused) {
        await audio.play();
        setIsPlayingMusic(true);
      } else {
        audio.pause();
        setIsPlayingMusic(false);
      }
    } catch (err) {
      console.error("Playback error:", err);
    }
  };

  const speakGuidedMeditation = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = speechSynthesis
      .getVoices()
      .find((v) => v.name.includes("Google") || v.lang.includes("en"));
    utterance.rate = 0.85; 
    utterance.pitch = 1;
    utterance.volume = 0.7; 
  
    speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (isRunning && enableVoice && timeLeft > 0) {
      const steps = [
        "Breathe in deeply...",
        "Hold your breath...",
        "Exhale slowly...",
        "Relax...",
      ];

      if (guidanceStep < steps.length) {
        speakGuidedMeditation(steps[guidanceStep]);
        setGuidanceStep((prev) => prev + 1);
      }
    }
  }, [isRunning, enableVoice, guidanceStep, timeLeft]);

  return (
    <div className="zen-portal">
      <div className="avatar-wrapper">
        {avatarData && (
          <Lottie animationData={avatarData} loop={true} className="avatar-lottie" />
        )}
      </div>

      {isRunning && breathAnimation && (
        <div className="breathing-animation">
          <Lottie animationData={breathAnimation} loop={true} />
        </div>
      )}

      {isRunning && (
        <p className="countdown-label">Time left: {formatTime(timeLeft)}</p>
      )}

      {!isRunning && (
        <div className="timer-controls">
          <label htmlFor="duration">Choose a session:</label>
          <select
            id="duration"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          >
            <option value="30s">30 seconds</option>
            <option value="1m">1 minute</option>
            <option value="5m">5 minutes</option>
          </select>
          <button onClick={handleStart}>Start Breathing</button>
        </div>
      )}

      <div className="voice-guidance">
        <label>
          <input
            type="checkbox"
            onChange={(e) => {
              setEnableVoice(e.target.checked);
              if (!e.target.checked) speechSynthesis.cancel(); 
            }}
          />
          🗣️ Enable Guided Voice Meditation
        </label>
      </div>

      <div className="music-player">
        <label>🎧 Choose meditation music:</label>
        <select onChange={(e) => handleMusicSelect(localTracks[e.target.value])} defaultValue="">
          <option value="" disabled>Select a track</option>
          {localTracks.map((track, index) => (
            <option key={index} value={index}>{track.title}</option>
          ))}
        </select>

        {currentTrack && (
          <div className="music-controls">
            <button onClick={toggleMusic}>
              {isPlayingMusic ? "Pause" : "Play"} Music
            </button>
            <audio id="meditation-audio" loop>
              <source src={currentTrack.url} type="audio/mp3" />
            </audio>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;