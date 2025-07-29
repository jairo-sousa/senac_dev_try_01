const mysql = require("mysql2");

const host = process.env.DB_HOST || "localhost";
const port = process.env.DB_PORT || 3306;
const user = process.env.DB_USER || "root";
const password = process.env.DB_PASSWORD || "";
const database = process.env.DB_NAME || "db_sm_3";

const connection = mysql.createConnection({
  host,
  port,
  user,
  password,
  database,
  multipleStatements: true,
});

connection.connect((error) => {
  if (error) console.error(`Erro ao connectar ao banco ${error.message}`);

  console.log("Conexão com banco realizada!");
});

module.exports = connection;
