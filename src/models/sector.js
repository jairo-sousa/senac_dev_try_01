const { runQuery } = require("../database/dbHelper");
const sectorQueries = require("./sectorQueries");

class SectortModel {
  getAll = () => runQuery(sectorQueries.getAll);
  getById = (id) => runQuery(sectorQueries.getById, [id]);

  post = (sector) => runQuery(sectorQueries.post, sector);

  update = (sector, id) => runQuery(sectorQueries.update, [...sector, id]);

  delete = (id) => runQuery(sectorQueries.remove, id);
}

module.exports = new SectortModel();
