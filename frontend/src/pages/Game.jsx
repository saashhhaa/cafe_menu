import { useState, useEffect } from "react";
import { ChangeLanguage } from "../components/ChangeLang";
import { Link } from "react-router-dom";
import { getLanguage, texts } from "../lang";
import { useNavigate } from "react-router-dom";

export const Game = () => {
  const [score, setScore] = useState(0);
  const [activeHole, setActiveHole] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [reactionTime, setReactionTime] = useState(700);
  const [timeLeft, setTimeLeft] = useState(30);
  const [discount, setDiscount] = useState(0);
  const lang = getLanguage();
  const navigate = useNavigate();

  const showMole = () => {
    if (gameOver) return;
    const randomHole = Math.floor(Math.random() * 7);
    setActiveHole(randomHole);

    const hideTimer = setTimeout(() => setActiveHole(null), reactionTime);
    return () => clearTimeout(hideTimer);
  };

  const handleClick = (holeIndex) => {
    if (holeIndex === activeHole && !gameOver) {
      setScore(score + 1);
      setActiveHole(null);
      setReactionTime(Math.max(reactionTime - 50, 100));
    }
  };

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(showMole, Math.random() * 1000 + 1000);
    return () => clearInterval(interval);
  }, [gameOver, reactionTime]);

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);

      let calcDiscount = 0;
      if (score < 5) calcDiscount = 5;
      else if (score < 10) calcDiscount = 10;
      else calcDiscount = 20;

      setDiscount(calcDiscount);

      localStorage.setItem("userDiscount", calcDiscount);

      setTimeout(() => navigate("/categories"), 5000);
    }
  }, [timeLeft, gameOver, score, navigate]);

  const resetGame = () => {
    setScore(0);
    setActiveHole(null);
    setGameOver(false);
    setReactionTime(300);
    setTimeLeft(30);
    setDiscount(0);
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <nav>
        <Link className="back" to="/categories">
          ←
        </Link>
        <ChangeLanguage />
      </nav>

      <h2 style={{ fontSize: "64px" }}>{texts.gameTitle[lang]}</h2>
      <p>
        {texts.score[lang]}: {score}
      </p>
      <p>
        {texts.timeLeft[lang]}: {timeLeft} сек
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 100px)",
          gap: "10px",
          justifyContent: "center",
          margin: "5vh 0",
        }}>
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: "#f0e8dab8",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              position: "relative",
            }}>
            {activeHole === index ? (
              <span style={{ fontSize: "50px" }}>🐹</span>
            ) : (
              <span style={{ fontSize: "30px" }}>🕳</span>
            )}
          </div>
        ))}
      </div>
      {gameOver && (
        <div className="modal" style={{ marginTop: 20 }}>
          <h3>{texts.gameOver[lang]}</h3>
          <p>
            {texts.score[lang]}: {score}
          </p>
          <p>
            {texts.yourDiscount[lang]}: {discount}%
          </p>
        </div>
      )}

      {!gameOver && timeLeft === 30 && (
        <button onClick={() => setTimeLeft(29)}>{texts.start[lang]}</button>
      )}
    </div>
  );
};
