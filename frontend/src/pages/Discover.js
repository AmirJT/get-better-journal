import React, { useState, useEffect } from 'react';
import '../styles/discover.css';
import Lottie from 'lottie-react';

const whatIfPrompts = [
  "What if your thoughts were stars?",
  "What if time paused for you right now?",
  "What if your inner critic wrote poetry?",
  "What if you could hear your future self?",
];

export default function Discover() {
  const [lotties, setLotties] = useState({});
  const [whatIfIndex, setWhatIfIndex] = useState(0);
  const [thought, setThought] = useState('');
  const [showThought, setShowThought] = useState(false);
  const [isPlayingSurprise, setIsPlayingSurprise] = useState(false);

  useEffect(() => {
    const loadLottie = async (name) => {
      const res = await fetch(`/${name}.json`);
      return await res.json();
    };

    const loadAll = async () => {
      const hero = await loadLottie('hero');
      const mystery1 = await loadLottie('mystery1');
      const mystery2 = await loadLottie('mystery2');
      const emotion1 = await loadLottie('emotion1');
      const emotion2 = await loadLottie('emotion2');
      const sparkle = await loadLottie('surprise'); 
      setLotties({ hero, mystery1, mystery2, emotion1, emotion2, sparkle });
    };

    loadAll();
  }, []);

  const handleSurprise = () => {
    const options = [
      "You're doing better than you think.",
      "The fog will clear — trust the process.",
      "You have magic. Real magic.",
    ];
    const random = Math.floor(Math.random() * options.length);
    const result = options[random];

    setIsPlayingSurprise(true);
    setShowThought(false);

    setTimeout(() => {
      setIsPlayingSurprise(false);
      setThought(result);
      setShowThought(true);
    }, 2500);
  };

  return (
    <div className="discover-page">
      <section className="hero">
        {lotties.hero && <Lottie animationData={lotties.hero} loop className="hero-lottie" />}
        <h1>Take a break. Stay curious.</h1>
        <p>This is your playground of thoughts — no rules, just wonder.</p>
      </section>

      <section className="mystery-grid">
        <div className="mystery-card">
          {lotties.mystery1 && <Lottie animationData={lotties.mystery1} loop />}
          <div className="card-reveal">You are not behind. You're on your way. 🌱</div>
        </div>
        <div className="mystery-card">
          {lotties.mystery2 && <Lottie animationData={lotties.mystery2} loop />}
          <div className="card-reveal">Everything changes, and that’s okay. 🔄</div>
        </div>
      </section>

      <section className="what-if-generator">
        <h2>What If...</h2>
        <div
          className="what-if-box"
          onClick={() => setWhatIfIndex((whatIfIndex + 1) % whatIfPrompts.length)}
        >
          {whatIfPrompts[whatIfIndex]}
        </div>
      </section>

      <section
        className="floating-bubble"
        onClick={() => alert('You are safe here.')}
        title="Click me"
      >
        💭
      </section>

      <section className="lottie-theater">
        <h2>Emotions in Motion</h2>
        <div className="theater-scroll">
          <div className="lottie-card">
            {lotties.emotion1 && <Lottie animationData={lotties.emotion1} loop />}
            <p>Feels like a silent sunrise 🌅</p>
          </div>
          <div className="lottie-card">
            {lotties.emotion2 && <Lottie animationData={lotties.emotion2} loop />}
            <p>Feels like deep ocean thoughts 🌊</p>
          </div>
        </div>
      </section>

      <section className="thought-puller">
        <button onClick={handleSurprise} disabled={isPlayingSurprise}>
          {isPlayingSurprise ? 'Loading...' : 'Surprise Me'}
        </button>
        {isPlayingSurprise && lotties.sparkle && (
          <div className="surprise-lottie">
            <Lottie animationData={lotties.sparkle} loop={false} />
          </div>
        )}
        {showThought && <div className="thought-card">{thought}</div>}
      </section>

     
    </div>
  );
}