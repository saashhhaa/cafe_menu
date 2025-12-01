import { useState, useEffect } from "react";
import { ChangeLanguage } from "../components/ChangeLang";
import { getLanguage, texts } from "../lang";
import { Link } from "react-router-dom";
import { Login } from "../components/Login";
import { getLogIn } from "../pages/LogInHandle";

export const Categories = () => {
  const isLogged = getLogIn();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:5000/categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    fetchCategories();
  }, []);
  const lang = getLanguage();
  const [titleRu, setTitleRu] = useState("");
  const [titleEng, setTitleEng] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);

  const addCategoryHandler = async () => {
    if (!titleRu || !titleEng) return;

    const formData = new FormData();
    formData.append("titleRu", titleRu);
    formData.append("titleEng", titleEng);

    if (image) formData.append("image", image);

    const res = await fetch("http://localhost:5000/categories", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      alert("Failed to add category");
      return;
    }

    const data = await res.json();
    setCategories([...categories, data]);

    setTitleRu("");
    setTitleEng("");
    setImage(null);
  };

  const deleteHandler = async (id) => {
    const res = await fetch(`http://localhost:5000/categories/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Failed to delete category");
      return;
    }

    setCategories(categories.filter((cat) => cat.id !== id));
  };

  return (
    <div className="categoryPage">
      <nav>
        <ChangeLanguage />
        <Login />
      </nav>

      <h2>{texts.pageTitle[lang]}</h2>

      <div className="inputCover" style={{ display: isLogged ? "block" : "none" }}>
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
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button
          className="page_button"
          onClick={addCategoryHandler}
          >
          {texts.addCategory[lang]}
        </button>
      </div>

      <div className="categoriesList">
        {categories.map((cat) => (
          <div key={cat.id} className="category">
            <Link to={`/categories/${cat.id}`}>
              <div>{lang === "ru" ? cat.titleRu : cat.titleEng}</div>
            </Link>
            {cat.imageUrl && (
              <img
                src={`http://localhost:5000${cat.imageUrl}`}
                alt={cat.title}
                width={100}
              />
            )}

            <button
              className="page_button"
              onClick={() => deleteHandler(cat.id)}
              style={{ display: isLogged ? "block" : "none" }}>
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
