const express = require("express");
// const controllers = require("../app/controllers");
const apiRouter = express.Router();

//API

//get item list
apiRouter.get("/api/v1/items",);

//get filtered item list
apiRouter.get(
  "/api/v1/items/filter/:category",
);

//get offered item list
apiRouter.get(
  "/api/v1/items/offered/:id",
);

//get transaction list
apiRouter.get(
  "/api/v1/items/transaction/:id",
);

//login
apiRouter.post("/api/v1/login",);

//register
apiRouter.post("/api/v1/register",);

//login or register using Google account
apiRouter.post("/api/v1/auth/google",);

//authenticate user
apiRouter.get("/api/v1/whoami",);

//logout
apiRouter.get("/api/v1/logout",);

//add item
apiRouter.post("/api/v1/items/add",);

//update item description
apiRouter.post("/api/v1/items/update/:id",);

//update user profile
apiRouter.post("/api/v1/profile/update/:id",);

//route not found
apiRouter.use();
apiRouter.use();

module.exports = apiRouter;