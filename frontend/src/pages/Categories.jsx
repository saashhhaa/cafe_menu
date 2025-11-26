import { useState } from "react";
import { ChangeLanguage } from "../components/ChangeLang";

export const Categories = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);

  const addCategoryHandler = () => {
    if (!title) return;

    const imageUrl = image ? URL.createObjectURL(image) : null;

    const newCategory = { id: Date.now(), title, imageUrl };

    setCategories([...categories, newCategory]);

    setTitle("");
    setImage(null);
  };

  return (
    <>
      <ChangeLanguage />
      <h2>Меню</h2>

      <input
        type="text"
        placeholder="Название категории"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button onClick={addCategoryHandler}>Добавить категорию</button>

      <hr />
      <div className="categoriesList">
        {categories.map((cat) => (
          <div key={cat.id} className="category">
            <div>{cat.title}</div>
            {cat.imageUrl && (
              <img src={cat.imageUrl} alt={cat.title} width={100} />
            )}
          </div>
        ))}
      </div>
    </>
  );
};
