export const showEl = () => {
  const elements = document.querySelectorAll(".fade-in");

  elements.forEach(el => {
    el.classList.remove("show");

    requestAnimationFrame(() => {
      el.classList.add("show");
    });
  });
};
