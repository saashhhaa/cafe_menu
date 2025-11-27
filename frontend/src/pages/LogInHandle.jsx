import { getLanguage, texts } from "../lang";
import { Link } from "react-router-dom";
import { useState } from "react";

export const getLogIn = () => {
  return localStorage.getItem("isLogged") || false;
};
export const logOut = () => {
  localStorage.removeItem("isLogged");
};


export const LogInHandler = () => {
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
    <>
      <Link to="/categories">{texts.goBack[lang]}</Link>
      <input
        type="text"
        value={login}
        placeholder={texts.placeLogin[lang]}
        onChange={(e) => setLogin(e.target.value)}
        required
        style={{ visibility: isLogged ? "hidden" : "visible" }}
      />
      <input
        type="password"
        placeholder={texts.placePassword[lang]}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ visibility: isLogged ? "hidden" : "visible" }}
      />
      <button
        onClick={logHandler}
        style={{ visibility: isLogged ? "hidden" : "visible" }}>
        Войти
      </button>
      <h1 style={{ visibility: isLogged ? "visible" : "hidden" }}>
        Добро пожаловать, {login}!
      </h1>
    </>
  );
};
