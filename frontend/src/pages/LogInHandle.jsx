import { getLanguage, texts } from "../lang";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { showEl } from "../animation";

export const getLogIn = () => {
  return localStorage.getItem("isLogged") || false;
};
export const logOut = () => {
  localStorage.removeItem("isLogged");
};

export const LogInHandler = () => {
  useEffect(() => {
    showEl();
  }, []);

  const lang = getLanguage();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isLogged, setIsLogged] = useState(false);

  const logHandler = async () => {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }),
    });

    if (!res.ok) {
      alert("Error");
      return;
    }

    const data = await res.json();

    localStorage.setItem("isLogged", true);
    setIsLogged(true);
  };

  return (
    <div className="loginPage">
      <Link className="back fade-in" to="/categories">
        ←
      </Link>
      <div className="form fade-in" style={{ display: isLogged ? "none" : "block" }}>
        <input
          type="text"
          value={login}
          placeholder={texts.placeLogin[lang]}
          onChange={(e) => setLogin(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder={texts.placePassword[lang]}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button onClick={logHandler}>{texts.logIn[lang]}</button>
      </div>

      <h1 className="form fade-in" style={{ display: isLogged ? "block" : "none" }}>
        {texts.welcomeAdmin[lang]}, {login}!
      </h1>
    </div>
  );
};
