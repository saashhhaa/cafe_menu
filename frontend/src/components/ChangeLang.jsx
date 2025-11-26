import { Link } from "react-router-dom";
import { getLanguage, texts } from "../lang";

export const ChangeLanguage = () => {
  const lang = getLanguage();

  return (
    <>
      <Link to="/">{texts.changeLang[lang]}</Link>
    </>
  );
};
