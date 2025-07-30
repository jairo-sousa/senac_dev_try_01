const userRouter = require("./user");
const viewRouter = require("./view");

module.exports = (app) => {
  app.use(userRouter);
  app.use(viewRouter);
};
