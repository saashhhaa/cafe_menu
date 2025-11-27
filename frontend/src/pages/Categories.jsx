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
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);

  const addCategoryHandler = async () => {
    if (!title) return;

    const formData = new FormData();
    formData.append("title", title);
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

    setTitle("");
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

      <input
        type="text"
        placeholder={texts.categoryName[lang]}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ visibility: isLogged ? "visible" : "hidden" }}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        style={{ visibility: isLogged ? "visible" : "hidden" }}
      />
      <button
        onClick={addCategoryHandler}
        style={{ visibility: isLogged ? "visible" : "hidden" }}>
        {texts.addCategory[lang]}
      </button>

      <hr style={{ visibility: isLogged ? "visible" : "hidden" }} />
      <div className="categoriesList">
        {categories.map((cat) => (
          <div key={cat.id} className="category">
            <Link to={`/categories/${cat.id}`}>{cat.title}</Link>
            {cat.imageUrl && (
              <img
                src={`http://localhost:5000${cat.imageUrl}`}
                alt={cat.title}
                width={100}
              />
            )}

            <button
              className=""
              onClick={() => deleteHandler(cat.id)}
              style={{ visibility: isLogged ? "visible" : "hidden" }}>
              {texts.delete[lang]}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
