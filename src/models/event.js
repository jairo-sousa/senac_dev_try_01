const { runQuery } = require("../database/dbHelper");
const eventQueries = require("./eventQueries");

class EventModel {
  getAll = () => runQuery(eventQueries.getAll);
  getById = (id) => runQuery(eventQueries.getById, [id]);

  post = (event) => runQuery(eventQueries.post, event);

  update = (event, id) => runQuery(eventQueries.update, [...event, id]);

  delete = (id) => runQuery(eventQueries.remove, id);
}

module.exports = new EventModel();
