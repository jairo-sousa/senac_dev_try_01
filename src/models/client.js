const { runQuery } = require("../database/dbHelper");
const clientQueries = require("./clientQueries");

class UserModel {
  getAll = () => runQuery(clientQueries.getAll);
  getById = (id) => runQuery(clientQueries.getById, [id]);
  getByEmail = (emailSent) => runQuery(clientQueries.getByEmail, [emailSent]);

  post = (clientSent) => runQuery(clientQueries.post, clientSent);

  update = (clientSent, id) => runQuery(clientQueries.update, [...clientSent, id]);

  delete = (id) => runQuery(clientQueries.remove, id);
}

module.exports = new UserModel();
