export const getLanguage = () => {
  return localStorage.getItem("lang") || "ru"; 
};

export const texts = {
  pageTitle: { ru: "Меню", eng: "Menu" },
  changeLang: { ru: "Изменить язык", eng: "Change language" },
  categoryName: { ru: "Название категории", eng: "Category title" },
  chooseFile: { ru: "Выбрать файл", eng: "Choose file" },
  addCategory: { ru: "Добавить категорию", eng: "Add category" },
  addPosition: {ru: "Добавить позицию", eng: "Add position"},

  setName : {ru: "Название позиции", eng: "Position title"},
  setContent: {ru: "Состав", eng: "Content"},
  setCost: {ru: "Цена", eng: "Cost"},

  goBack: {ru: "Вернуться", eng: "Back"},
  delete: {ru: "Удалить", eng: "Delete"}
};
