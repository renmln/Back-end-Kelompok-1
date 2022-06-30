const express = require("express");
const cors = require("cors");

// const controllers = require("../app/controllers");
const controllers = require("../app/controllers");
const uploadOnMemory = require("../app/uploadOnMemory");
const apiRouter = express.Router();
apiRouter.use(cors());

//API

apiRouter.get("/");

//API Authentication & Authorization
apiRouter.post("/api/v1/register", controllers.api.v1.authController.register);
apiRouter.post("/api/v1/login", controllers.api.v1.authController.login);
apiRouter.get("/api/v1/whoami", controllers.api.v1.authController.whoAmI);
apiRouter.post("/api/v1/auth/google");

// API User Info
apiRouter.put(
  "/api/v1/profile/update",
  uploadOnMemory.single("picture"),
  controllers.api.v1.userController.updateInfoAkun
);
//get user id
apiRouter.get(
  "/api/v1/users/:id",
  controllers.api.v1.userController.findUserById
);

// API CRUD Product
apiRouter.get(
  "/api/v1/products",
  controllers.api.v1.productController.findAllProduct
); // Find All Product in Homepage
apiRouter.get(
  "/api/v1/product",
  controllers.api.v1.productController.findMyProduct
); // Find Product By IdSeller in Daftar Jual
apiRouter.post(
  "/api/v1/product",
  uploadOnMemory.array("picture", 4),
  controllers.api.v1.productController.addProduct
); // Add Product
apiRouter.get(
  "api/v1/product/:id",
  controllers.api.v1.productController.findOneProduct
);

apiRouter.put(
  "/api/v1/product/update/:id",
  controllers.api.v1.productController.updateProduct
); // Edit Product
apiRouter.put(
  "/api/v1/products/cloudinary",
  uploadOnMemory.array("picture", 4),
  controllers.api.v1.productController.uploadProductImages
); // Upload Product Images

//get product list
apiRouter.get(
  "/api/v1/products",
  controllers.api.v1.productController.findAllProduct
);

//get filtered product list
apiRouter.get("/api/v1/products/filter/:category");

//Offered product
apiRouter.get("/api/v1/products/offered/:id");
apiRouter.post(
  "/api/v1/products/offer",
  controllers.api.v1.penawaranController.createPenawaran
);

//create a transaction
apiRouter.post("/api/v1/products/transaction");
apiRouter.get("/api/v1/products/transaction/:id");

//route not found
apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
