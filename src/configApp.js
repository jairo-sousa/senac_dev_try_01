const path = require("path");
const cors = require("cors");
const session = require("express-session");

const SESSION_SECRET = process.env.SESSION_SECRET || "db_sm_3";

module.exports = (app, express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extends: true }));

  app.use(cors());

  app.use(express.static(__dirname + "/public"));

  app.use(
    session({
      secret: SESSION_SECRET,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60000 * 60,
      },
    })
  );

  app.set("view engine", "ejs");
  app.set("views", path.resolve(__dirname, "views"));
};
