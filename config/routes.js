const express = require("express");
const cors = require("cors");

// const controllers = require("../app/controllers");
const controllers = require("../app/controllers");
const uploadOnMemory = require("../app/uploadOnMemory");
const apiRouter = express.Router();
apiRouter.use(cors());

//API

apiRouter.get("/");

//get user id
apiRouter.get(
  "/api/v1/users/:id",
  controllers.api.v1.userController.findUserById
);

//get product list
apiRouter.get(
  "/api/v1/products",
  controllers.api.v1.productController.findAllProduct
);

//get the seller products
apiRouter.get(
  "/api/v1/products/:id",
  controllers.api.v1.productController.findMyProduct
);

//get filtered product list
apiRouter.get("/api/v1/products/filter/:category");

//get offered product list
apiRouter.get("/api/v1/products/offered/:id");

//get transaction list
apiRouter.get("/api/v1/products/transaction/:id");

//login
apiRouter.post("/api/v1/login", controllers.api.v1.authController.login);

//register
apiRouter.post("/api/v1/register", controllers.api.v1.authController.register);

//login or register using Google account
apiRouter.post("/api/v1/auth/google");

//authenticate user
apiRouter.get("/api/v1/whoami");

//logout
apiRouter.get("/api/v1/logout");

//add item
apiRouter.post("/api/v1/items/add");

//add product
apiRouter.post(
  "/api/v1/products/add",
  controllers.api.v1.productController.addProduct
);

//offering a product
apiRouter.post("/api/v1/products/offer");

//create a transaction
apiRouter.post("/api/v1/products/transaction");

//update product description
apiRouter.put(
  "/api/v1/products/update/:id",
  controllers.api.v1.productController.updateProduct
);

//update user profile
apiRouter.put(
  "/api/v1/profile/update/:id",
  controllers.api.v1.userController.updateProfile
);

//upload photo Profile
apiRouter.put(
  "/api/v1/profile/cloudinary/:id",
  uploadOnMemory.single("picture"),
  controllers.api.v1.userController.uploadPhoto
);

//upload product images
apiRouter.put(
  "/api/v1/products/cloudinary/:id",
  uploadOnMemory.array("picture"), 4,
  controllers.api.v1.productController.uploadProductImages
);

//route not found
apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
