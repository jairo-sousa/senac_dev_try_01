const connection = require("./connection");

const runQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (error, response) => {
      if (error) reject(error);

      resolve(response);
    });
  });
};

module.exports = { runQuery };
