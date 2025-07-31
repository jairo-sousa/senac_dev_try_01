const userRouter = require("./user");
const publicRouter = require("./public");
const viewRouter = require("./view");
const eventRouter = require("./event");

module.exports = (app) => {
  app.use(publicRouter);
  app.use(userRouter);
  app.use(viewRouter);
  app.use(eventRouter);
};
