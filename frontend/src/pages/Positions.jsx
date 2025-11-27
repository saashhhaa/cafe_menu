import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChangeLanguage } from "../components/ChangeLang";
import { getLanguage, texts } from "../lang";
import { getLogIn } from "../pages/LogInHandle";
import { Login } from "../components/Login";

export const Positions = () => {
  const isLogged = getLogIn();
  const lang = getLanguage();
  const { categoryId } = useParams();
  const [positions, setPositions] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [cost, setCost] = useState(0);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!categoryId) return;
    fetch(`http://localhost:5000/positions?categoryId=${categoryId}`)
      .then((res) => res.json())
      .then((data) => setPositions(data));
  }, [categoryId]);

  const addPositionHandler = async () => {
    if (!title) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
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

    setTitle("");
    setContent("");
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
    <div>
      <ChangeLanguage />
      <Login />

      <Link to="/categories">{texts.goBack[lang]}</Link>
      <h2>{texts.pageTitle[lang]}</h2>

      <input
        type="text"
        placeholder={texts.setName[lang]}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ visibility: isLogged ? "visible" : "hidden" }}
      />
      <input
        type="text"
        placeholder={texts.setContent[lang]}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ visibility: isLogged ? "visible" : "hidden" }}
      />
      <input
        type="number"
        placeholder={texts.setCost[lang]}
        value={cost}
        onChange={(e) => setCost(Number(e.target.value))}
        style={{ visibility: isLogged ? "visible" : "hidden" }}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        style={{ visibility: isLogged ? "visible" : "hidden" }}
      />

      <button
        onClick={addPositionHandler}
        style={{ visibility: isLogged ? "visible" : "hidden" }}>
        {texts.addPosition[lang]}
      </button>

      <hr style={{ visibility: isLogged ? "visible" : "hidden" }} />
      <div className="categoriesList">
        {positions.map((pos) => (
          <div key={pos.id} className="category">
            {pos.imageUrl && (
              <img
                src={`http://localhost:5000${pos.imageUrl}`}
                alt={pos.title}
                width={100}
              />
            )}
            <div>{pos.title}</div>
            <div>{pos.content}</div>
            <div>{pos.cost}</div>
            <button
              onClick={() => deleteHandler(pos.id)}
              style={{ visibility: isLogged ? "visible" : "hidden" }}>
              {texts.delete[lang]}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
