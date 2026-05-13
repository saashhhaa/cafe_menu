import { useState, useEffect } from "react";
import { ChangeLanguage } from "../components/ChangeLang";
import { getLanguage, texts } from "../lang";
import { Link } from "react-router-dom";
import { showEl } from "../animation";
import { Banner } from "../components/Banner";

export const Categories = () => {
  const lang = getLanguage();

  const isLogged =
    localStorage.getItem("isLogged") === "true";

  const [categories, setCategories] = useState([]);
  const [banners, setBanners] = useState([]);

  const [titleRu, setTitleRu] = useState("");
  const [titleEng, setTitleEng] = useState("");
  const [image, setImage] = useState(null);

  const [bannerTitleRu, setBannerTitleRu] = useState("");
  const [bannerTitleEng, setBannerTitleEng] = useState("");
  const [bannerImage, setBannerImage] = useState(null);

  useEffect(() => {
    showEl();
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/banners")
      .then((res) => res.json())
      .then((data) => setBanners(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/categories"
        );

        const data = await res.json();

        setCategories(data);
      } catch (err) {
        console.error(
          "Failed to fetch categories:",
          err
        );
      }
    };

    fetchCategories();
  }, []);

  const addCategoryHandler = async () => {
    if (!titleRu || !titleEng) return;

    const formData = new FormData();

    formData.append("titleRu", titleRu);
    formData.append("titleEng", titleEng);

    if (image) {
      formData.append("image", image);
    }

    const res = await fetch(
      "http://localhost:5000/categories",
      {
        method: "POST",
        body: formData,
      }
    );

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
    const res = await fetch(
      `http://localhost:5000/categories/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) {
      alert("Failed to delete category");
      return;
    }

    setCategories(
      categories.filter((cat) => cat.id !== id)
    );
  };

  const addBannerHandler = async () => {
    const formData = new FormData();

    formData.append("titleRu", bannerTitleRu);
    formData.append("titleEng", bannerTitleEng);

    if (bannerImage) {
      formData.append("image", bannerImage);
    }

    const res = await fetch(
      "http://localhost:5000/banners",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!res.ok) {
      alert("Failed to add banner");
      return;
    }

    const data = await res.json();

    setBanners([...banners, data]);

    setBannerTitleRu("");
    setBannerTitleEng("");
    setBannerImage(null);
  };

  const deleteBanner = async (id) => {
    const confirmDel = window.confirm(
      "Вы точно хотите удалить баннер?"
    );

    if (!confirmDel) return;

    const res = await fetch(
      `http://localhost:5000/banners/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) {
      alert("Не удалось удалить баннер");
      return;
    }

    setBanners(
      banners.filter((b) => b.id !== id)
    );
  };

  return (
    <div className="categoryPage">
      <nav className="fade-in">
        <ChangeLanguage />

        {localStorage.getItem("userDiscount") ? (
          <span style={{ fontWeight: "900" }}>
            {texts.yourDiscount[lang]}:{" "}
            {localStorage.getItem("userDiscount")}%
          </span>
        ) : (
          <Link to="/game">
            {texts.game[lang]}
          </Link>
        )}

        {!isLogged ? (
          <Link to="/logIn">
            {texts.logIn[lang]}
          </Link>
        ) : (
          <button
            onClick={() => {
              localStorage.removeItem("isLogged");
              localStorage.removeItem("adminLogin");

              window.location.reload();
            }}>
            {texts.logOut[lang]}
          </button>
        )}
      </nav>

      <div
        className="inputCover fade-in"
        style={{
          display: isLogged ? "block" : "none",
        }}>
        <input
          type="text"
          placeholder={texts.setNameRu[lang]}
          value={bannerTitleRu}
          onChange={(e) =>
            setBannerTitleRu(e.target.value)
          }
        />

        <input
          type="text"
          placeholder={texts.setNameEng[lang]}
          value={bannerTitleEng}
          onChange={(e) =>
            setBannerTitleEng(e.target.value)
          }
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setBannerImage(e.target.files[0])
          }
        />

        <button onClick={addBannerHandler}>
          {texts.addBunner[lang]}
        </button>
      </div>

      <Banner
        banners={banners}
        lang={lang}
        isLogged={isLogged}
        deleteBanner={deleteBanner}
      />

      <h2 className="fade-in">
        {texts.pageTitle[lang]}
      </h2>

      <div
        className="inputCover fade-in"
        style={{
          display: isLogged ? "block" : "none",
        }}>
        <input
          type="text"
          placeholder={texts.setNameRu[lang]}
          value={titleRu}
          onChange={(e) =>
            setTitleRu(e.target.value)
          }
        />

        <input
          type="text"
          placeholder={texts.setNameEng[lang]}
          value={titleEng}
          onChange={(e) =>
            setTitleEng(e.target.value)
          }
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImage(e.target.files[0])
          }
        />

        <button
          className="page_button"
          onClick={addCategoryHandler}>
          {texts.addCategory[lang]}
        </button>
      </div>

      <div className="categoriesList fade-in">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="category">
            <Link
              to={`/categories/${cat.id}`}>
              <div>
                {lang === "ru"
                  ? cat.titleRu
                  : cat.titleEng}
              </div>
            </Link>

            {cat.imageUrl && (
              <img
                src={`http://localhost:5000${cat.imageUrl}`}
                alt={cat.titleRu}
                width={100}
              />
            )}

            <button
              className="page_button"
              onClick={() =>
                deleteHandler(cat.id)
              }
              style={{
                display: isLogged
                  ? "block"
                  : "none",
              }}>
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};