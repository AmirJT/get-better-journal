import React, { useEffect } from "react";
import "../styles/interactiveCharacter.css"; // ✅ Create this file for styling

const InteractiveCharacter = () => {
  useEffect(() => {
    const handleMouseMove = (event) => {
      const eyes = document.querySelectorAll(".pupil");
      eyes.forEach((pupil) => {
        let eye = pupil.parentElement;
        let eyeRect = eye.getBoundingClientRect();

        let eyeCenterX = eyeRect.left + eyeRect.width / 2;
        let eyeCenterY = eyeRect.top + eyeRect.height / 2;

        let deltaX = event.clientX - eyeCenterX;
        let deltaY = event.clientY - eyeCenterY;

        let angle = Math.atan2(deltaY, deltaX);
        let distance = Math.min(10, Math.sqrt(deltaX ** 2 + deltaY ** 2));

        let pupilX = distance * Math.cos(angle);
        let pupilY = distance * Math.sin(angle);

        pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div id="cartoon" role="img" aria-labelledby="description">
      <div id="description">Interactive Cartoon Character</div>
      <div className="body"></div>
      <div className="ear"></div>
      <div className="ear"></div>
      <div className="neck"></div>
      <div className="hair-back"></div>
      <div className="face">
        <div className="cheeks"></div>
        <div className="eye left-eye"><div className="pupil"></div></div>
        <div className="eye right-eye"><div className="pupil"></div></div>
        <div className="mouth"></div>
        <div className="freckles"></div>
        <div className="nose"></div>
      </div>
      <div className="hair-top"></div>
    </div>
  );
};

export default InteractiveCharacter;