export const getLanguage = () => {
  return localStorage.getItem("lang") || "ru"; 
};

export const texts = {
  welcome: {ru: "Добро пожаловать", eng:" Welcome"},
  pageTitle: { ru: "Меню", eng: "Menu" },
  changeLang: { ru: "Изменить язык", eng: "Change language" },
  chooseFile: { ru: "Выбрать файл", eng: "Choose file" },
  addCategory: { ru: "Добавить категорию", eng: "Add category" },
  addPosition: {ru: "Добавить позицию", eng: "Add position"},

  setNameRu : {ru: "Название на русском", eng: "Title in russian"},
  setNameEng : {ru: "Название на английском", eng: "Tile in english"},
  setContentRu: {ru: "Состав на русском", eng: "Content in russian"},
  setContentEng: {ru: "Состав на английском", eng: "Content in english"},
  setCost: {ru: "Цена", eng: "Cost"},

  // goBack: {ru: "Вернуться", eng: "Back"},
  // delete: {ru: "Удалить", eng: "Delete"},
  logIn: {ru: "Войти в аккаунт", eng: "Log in"},
  logOut: {ru: "Выйти", eng: "Log out"},

  placePassword: {ru: "Пароль", eng: "Password"},
  placeLogin: {ru: "Логин", eng: "Login"}
};
