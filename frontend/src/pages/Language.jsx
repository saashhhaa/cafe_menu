import { useEffect } from "react";
import { showEl } from "../animation";
import { Link } from "react-router-dom";
import { texts, getLanguage } from "../lang";

export const Language = () => {
  const lang = getLanguage();

  useEffect(() => {
    showEl();
  }, []);

  const ruHandler = () => {
    localStorage.setItem("lang", "ru");
  };
  const engHandler = () => {
    localStorage.setItem("lang", "eng");
  };

  return (
    <div className="langPage">
      <h1 className="fade-in">{texts.welcome[lang]}</h1>
      <div className="cover">
        <Link className="link fade-in" to="/categories" onClick={ruHandler}>
          Русский
        </Link>
        <Link className="link fade-in" to="/categories" onClick={engHandler}>
          English
        </Link>
      </div>
      <video src="/cafe_menu/back.mp4" autoPlay muted loop playsInline />
    </div>
  );
};
