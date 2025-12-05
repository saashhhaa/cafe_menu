const db = require("./db");

module.exports = function (app) {
  app.post('/login', (req, res) => {
    const { login, password } = req.body;

    const user = db.prepare(
      `SELECT * FROM users WHERE login = ? AND password = ?`
    ).get(login, password);

    if (!user) {
      return res.status(401).json({ message: 'Incorrect data' });
    }
  });
};
