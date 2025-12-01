import { Link } from "react-router-dom";
import { texts, getLanguage } from "../lang";

export const Language = () => {
  const lang = getLanguage();

  const ruHandler = () => {
    localStorage.setItem("lang", "ru");
  };
  const engHandler = () => {
    localStorage.setItem("lang", "eng");
  };

  return (
    <div className="langPage">
      <h1>{texts.welcome[lang]}</h1>
      <div className="cover">
        <Link className="link" to="/categories" onClick={ruHandler}>
          Русский
        </Link>
        <Link className="link" to="/categories" onClick={engHandler}>
          English
        </Link>
      </div>
        <video src="public/back.mp4" autoPlay muted loop playsInline />
    </div>
  );
};
