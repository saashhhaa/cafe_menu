import { useState, useEffect } from "react";
import { ChangeLanguage } from "../components/ChangeLang";
import { getLanguage, texts } from "../lang";
import { Link } from "react-router-dom";

export const Categories = () => {
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

  // Добавление категории
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

  // Удаление категории
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
    <>
      <ChangeLanguage />
      <h2>{texts.pageTitle[lang]}</h2>

      <input
        type="text"
        placeholder={texts.categoryName[lang]}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button onClick={addCategoryHandler}>{texts.addCategory[lang]}</button>

      <hr />
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
            <button onClick={() => deleteHandler(cat.id)}>
              {texts.delete[lang]}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};
