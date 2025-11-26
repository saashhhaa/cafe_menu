import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChangeLanguage } from "../components/ChangeLang";
import { getLanguage, texts } from "../lang";

export const Positions = () => {
  const lang = getLanguage();
  const { categoryId } = useParams();
  const [positions, setPositions] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [cost, setCost] = useState(0);
  const [image, setImage] = useState(null);

  // Загрузка позиций для выбранной категории
  useEffect(() => {
    if (!categoryId) return;
    fetch(`http://localhost:5000/positions?categoryId=${categoryId}`)
      .then(res => res.json())
      .then(data => setPositions(data));
  }, [categoryId]);

  // Добавление позиции
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

  // Удаление позиции
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
      <Link to="/categories">{texts.goBack[lang]}</Link>
      <h2>{texts.pageTitle[lang]}</h2>

      <input
        type="text"
        placeholder={texts.setName[lang]}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder={texts.setContent[lang]}
        value={content}
        onChange={(e) => setContent(e.target.value)}
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

      <button onClick={addPositionHandler}>{texts.addPosition[lang]}</button>

      <hr />
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
            <button onClick={() => deleteHandler(pos.id)}>
              {texts.delete[lang]}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
