export const showEl = () => {
  const elements = document.querySelectorAll(".fade-in");

  elements.forEach(el => {
    // сначала убираем show — нужно при переходах
    el.classList.remove("show");

    // затем добавляем с задержкой 1 кадр
    requestAnimationFrame(() => {
      el.classList.add("show");
    });
  });
};
