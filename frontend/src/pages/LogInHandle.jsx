import { getLanguage, texts } from "../lang";
import { Link} from "react-router-dom";
import { useState, useEffect } from "react";
import { showEl } from "../animation";

export const LogInHandler = () => {
  useEffect(() => {
    showEl();
  }, []);

  // const navigate = useNavigate();

  const lang = getLanguage();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [isLogged, setIsLogged] = useState(
    localStorage.getItem("isLogged") === "true"
  );

  async function logHandler() {
  try {
    const response = await fetch(
      "http://localhost:5000/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login,
          password,
        }),
      }
    );

    const data = await response.json();

    console.log(data);

    if (!response.ok) {
      alert(data.message);
      return;
    }

    localStorage.setItem("isLogged", "true");
localStorage.setItem("adminLogin", login);

setIsLogged(true);
    alert("Successful login");

    window.location.reload();
  } catch (err) {
    console.log(err);
  }
}

  function handleLogout() {
    localStorage.removeItem("isLogged");
    localStorage.removeItem("adminLogin");

    setIsLogged(false);
  }

  return (
    <div className="loginPage">
      <Link className="back fade-in" to="/categories">
        ←
      </Link>

      {!isLogged ? (
        <div className="form fade-in">
          <input
            type="text"
            value={login}
            placeholder={texts.placeLogin[lang]}
            onChange={(e) => setLogin(e.target.value)}
          />

          <input
            type="password"
            placeholder={texts.placePassword[lang]}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type='submit' onClick={logHandler}>
            {texts.logIn[lang]}
          </button>
        </div>
      ) : (
        <div className="form fade-in">
          <h1>
            {texts.welcomeAdmin[lang]},{" "}
            {localStorage.getItem("adminLogin")}!
          </h1>

          <button onClick={handleLogout}>
            {texts.logOut[lang]}
          </button>
        </div>
      )}
    </div>
  );
};