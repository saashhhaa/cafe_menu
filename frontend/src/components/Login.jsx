import { getLanguage, texts } from "../lang";
import { Link } from "react-router-dom";
import { getLogIn, logOut } from "../pages/LogInHandle";

export const Login = () => {
  const lang = getLanguage();
  const isLogged = getLogIn();
  const handleLogout = () => {
    logOut();
    window.location.reload();
  };

  return (
    <>
      {isLogged ? (
        <button onClick={handleLogout}>{texts.logOut[lang]}</button>
      ) : (
        <Link to="/logIn">{texts.logIn[lang]}</Link>
      )}
    </>
  );
};
