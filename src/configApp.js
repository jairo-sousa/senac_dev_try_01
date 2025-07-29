const path = require("path");
const cors = require("cors");
const session = require("express-session");

const SESSION_SECRET = process.env.SESSION_SECRET || "DB_SMH";

module.exports = (app, express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extends: true }));

  const corsOptions = {
    origin: "*",
    methods: "GET,POST,PUT,DELETE",

    allowedHeaders: "Content-Type,Authorization",
  };

  app.use(cors(corsOptions));

  app.use(express.static(__dirname + "/public"));

  app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000 * 60,
      },
    })
  );

  app.set("view engine", "ejs");
  app.set("views", path.resolve(__dirname, "views"));
};
