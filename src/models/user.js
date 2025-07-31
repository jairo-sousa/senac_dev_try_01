const { runQuery } = require("../database/dbHelper");
const userQueries = require("./userQueries");

class UserModel {
  getAll = () => runQuery(userQueries.getAll);
  getById = (id) => runQuery(userQueries.getById, [id]);
  getByEmail = (emailSent) => runQuery(userQueries.getByEmail, [emailSent]);

  post = (userSent) => runQuery(userQueries.post, userSent);

  update = (userSent, id) => runQuery(userQueries.update, [...userSent, id]);
  updateWithPassword = (userSent, id) =>
    runQuery(userQueries.updateWithPassword, [...userSent, id])

  delete = (id) => runQuery(userQueries.remove, id);
}

module.exports = new UserModel();
