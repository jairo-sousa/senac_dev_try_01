const { Router } = require("express");
const { ensureAuthenticated, authorizeRoles } = require("../authMiddleware");

const viewRouter = Router();


//

viewRouter.get("/view/dashboard", ensureAuthenticated, authorizeRoles([1])
  , (req, reply) => {
    reply.render("dashboard", { user: req.session.user });
  });

viewRouter.get("/view/sales", ensureAuthenticated, authorizeRoles([1, 2])
  , (req, reply) => {

    reply.render("sales", { user: req.session.user });
  });

viewRouter.get("/view/tickets", ensureAuthenticated, authorizeRoles([1, 2, 3])
  , (req, reply) => {

    // TICKET OPTIONS BASED ON PROFILE ID 
    reply.render("tickets", { user: req.session.user });

  });

module.exports = viewRouter