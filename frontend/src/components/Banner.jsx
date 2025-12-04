import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

export const Banner = ({ banners, lang, isLogged, deleteBanner }) => {
  if (!banners.length) return null;

  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 3000 }}
      loop={true}
      slidesPerView={1}  
      spaceBetween={0}   
    >
      {banners.map((b) => (
        <SwiperSlide key={b.id} >
          <div
            className="bannerSlide "
            style={{
              width: "80vw",
              height: "70vh",
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              borderRadius: "10px",
              marginLeft: "10vw",
              marginBottom: "5vh"
            }}
          >
            <img
              src={`http://localhost:5000${b.imageUrl}`}
              alt="banner"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />

            <div
              className="bannerTitle"
              style={{
                position: "absolute",
                bottom: "10vh",
                left: "5vw",
                color: "#fff",
                fontSize: "32px",
                textShadow: "1px 1px 5px rgba(0,0,0,0.7)",
              }}
            >
              {lang === "ru" ? b.titleRu : b.titleEng}
            </div>

            {isLogged && deleteBanner && (
              <button
                onClick={() => deleteBanner(b.id)}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  zIndex: 10,
                }}
              >
                🗑️
              </button>
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
