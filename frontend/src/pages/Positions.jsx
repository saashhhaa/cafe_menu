import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChangeLanguage } from "../components/ChangeLang";
import { getLanguage, texts } from "../lang";
// import { getLogIn } from "../pages/LogInHandle";
// import { Login } from "../components/Login";
import { showEl } from "../animation";


export const Positions = () => {
  const isLogged =
  localStorage.getItem("isLogged") === "true";
  const lang = getLanguage();
  const { categoryId } = useParams();
  const [cat, setCat] = useState(null);
  const [positions, setPositions] = useState([]);
  const [titleRu, setTitleRu] = useState("");
  const [titleEng, setTitleEng] = useState("");
  const [contentRu, setContentRu] = useState("");
  const [contentEng, setContentEng] = useState("");
  const [cost, setCost] = useState(0);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!categoryId) return;

    fetch(`http://localhost:5000/positions?categoryId=${categoryId}`)
      .then((res) => res.json())
      .then((data) => setPositions(data));

    fetch(`http://localhost:5000/categories`)
      .then((res) => res.json())
      .then((data) => {
        const category = data.find((c) => c.id === Number(categoryId));
        setCat(category);
      });
  }, [categoryId]);

  useEffect(() => {
    showEl();
  }, []);

  const addPositionHandler = async () => {
    if (!titleRu || !titleEng) return;

    const formData = new FormData();
    formData.append("titleRu", titleRu);
    formData.append("titleEng", titleEng);
    formData.append("contentRu", contentRu);
    formData.append("contentEng", contentEng);

    formData.append("cost", cost);
    formData.append("categoryId", categoryId);
    if (image) formData.append("image", image);

    const res = await fetch("http://localhost:5000/positions", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      alert("Failed to add position");
      return;
    }

    const data = await res.json();
    setPositions([...positions, data]);

    setTitleRu("");
    setTitleEng("");
    setContentRu("");
    setContentEng("");
    setCost(0);
    setImage(null);
  };

  const deleteHandler = async (id) => {
    const res = await fetch(`http://localhost:5000/positions/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Failed to delete position");
      return;
    }

    setPositions(positions.filter((pos) => pos.id !== id));
  };

  return (
    <div className="positionsPage fade-in">
      <nav>
        <Link className="back" to="/categories">
          ←
        </Link>
        {localStorage.getItem("userDiscount") ? (
          <span style={{fontWeight:"900"}}>
            {texts.yourDiscount[lang]}: {localStorage.getItem("userDiscount")}%
          </span>
        ) : (
          <Link to="/game">{texts.game[lang]}</Link>
        )}
        <ChangeLanguage />
        {/* <Login /> */}
      </nav>

      <h2 className="fade-in">{texts.pageTitle[lang]}</h2>

      <div
        className="inputCover fade-in"
        style={{ display: isLogged ? "block" : "none" }}>
        <input 
          type="text"
          placeholder={texts.setNameRu[lang]}
          value={titleRu}
          onChange={(e) => setTitleRu(e.target.value)}
        />
        <input
          type="text"
          placeholder={texts.setNameEng[lang]}
          value={titleEng}
          onChange={(e) => setTitleEng(e.target.value)}
        />
        <input
          type="text"
          placeholder={texts.setContentRu[lang]}
          value={contentRu}
          onChange={(e) => setContentRu(e.target.value)}
        />
        <input
          type="text"
          placeholder={texts.setContentEng[lang]}
          value={contentEng}
          onChange={(e) => setContentEng(e.target.value)}
        />

        <input
          type="number"
          placeholder={texts.setCost[lang]}
          value={cost}
          onChange={(e) => setCost(Number(e.target.value))}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button className="page_button " onClick={addPositionHandler}>
          {texts.addPosition[lang]}
        </button>
      </div>

      <h3 className="fade-in">
        {cat
          ? lang === "ru"
            ? cat.titleRu
            : cat.titleEng
          : texts.pageTitle[lang]}
      </h3>

      <div className="positionsList fade-in">
        {positions.map((pos) => (
          <div key={pos.id} className="position">
            {pos.imageUrl && (
              <img
                src={`http://localhost:5000${pos.imageUrl}`}
                alt={pos.title}
                width={100}
              />
            )}
            <div className="title">
              {lang === "ru" ? pos.titleRu : pos.titleEng}
            </div>
            <div className="content">
              {lang === "ru" ? pos.contentRu : pos.contentEng}
            </div>
            <div className="cost">{pos.cost}</div>
            <button
              className="page_button"
              onClick={() => deleteHandler(pos.id)}
              style={{ display: isLogged ? "block" : "none" }}>
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
