export const getLanguage = () => {
  return localStorage.getItem("lang") || "ru";
};

export const texts = {
  welcome: { ru: "Добро пожаловать", eng: " Welcome" },
  pageTitle: { ru: "Меню", eng: "Menu" },
  changeLang: { ru: "Изменить язык", eng: "Change language" },
  chooseFile: { ru: "Выбрать файл", eng: "Choose file" },
  addCategory: { ru: "Добавить категорию", eng: "Add category" },
  addPosition: { ru: "Добавить позицию", eng: "Add position" },
  addBunner: { ru: "Добавить баннер", eng: "Add bunner" },

  setNameRu: { ru: "Название на русском", eng: "Title in russian" },
  setNameEng: { ru: "Название на английском", eng: "Tile in english" },
  setContentRu: { ru: "Состав на русском", eng: "Content in russian" },
  setContentEng: { ru: "Состав на английском", eng: "Content in english" },
  setCost: { ru: "Цена", eng: "Cost" },

  welcomeAdmin: { ru: "Добро пожаловать", eng: "Welcome back" },
  logIn: { ru: "Войти в аккаунт", eng: "Log in" },
  logOut: { ru: "Выйти", eng: "Log out" },
  game: { ru: "Получить бонусы", eng: "Get bonuses" },

  placePassword: { ru: "Пароль", eng: "Password" },
  placeLogin: { ru: "Логин", eng: "Login" },
  gameTitle: {
    ru: 'Игра "Бей крота"',
    eng: "Whack-a-Mole Game",
  },
  score: {
    ru: "Очки",
    eng: "Score",
  },
  timeLeft: {
    ru: "Время осталось",
    eng: "Time left",
  },
  gameOver: {
    ru: "Игра завершена!",
    eng: "Game Over!",
  },
  yourDiscount: {
    ru: "Ваша скидка",
    eng: "Your discount",
  },
  playAgain: {
    ru: "Играть заново",
    eng: "Play Again",
  },
  start: {
    ru: "Старт!",
    eng: "Start!",
  },
};
