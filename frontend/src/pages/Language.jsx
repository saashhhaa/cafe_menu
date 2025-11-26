import { Link } from "react-router-dom";

export const Language = () => {
  const ruHandler = () => {
    localStorage.setItem("lang", "ru");
  };
  const engHandler = () => {
    localStorage.setItem("lang", "eng");
  };

  return (
    <>
      <Link to="/categories" onClick={ruHandler}>
        Русский
      </Link>
      <Link to="/categories" onClick={engHandler}>
        English
      </Link>
    </>
  );
};
