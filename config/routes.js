const express = require("express");
const controllers = require("../app/controllers");
const apiRouter = express.Router();

//API

//get product list
apiRouter.get("/api/v1/products", controllers.api.v1.productController.findAllProduct);

//get the seller products
apiRouter.get("/api/v1/products/:id", controllers.api.v1.productController.findMyProduct);

//get filtered product list
apiRouter.get("/api/v1/products/filter/:category",);

//get offered product list
apiRouter.get(
  "/api/v1/products/offered/:id",
);

//get transaction list
apiRouter.get(
  "/api/v1/products/transaction/:id",
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

//add product
apiRouter.post("/api/v1/products/add", controllers.api.v1.productController.addProduct);

//offering a product
apiRouter.post("/api/v1/products/offer",);

//create a transaction
apiRouter.post("/api/v1/products/transaction",);

//update product description
apiRouter.put("/api/v1/products/update/:id", controllers.api.v1.productController.updateProduct);

//update user profile
apiRouter.put("/api/v1/profile/update/:id", controllers.api.v1.userController.updateProfile);

//route not found
// apiRouter.use();
// apiRouter.use();

module.exports = apiRouter;