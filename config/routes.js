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
apiRouter.post("/api/v1/auth/google", controllers.api.v1.authController.google);
apiRouter.post(
  "/api/v1/password-reset",
  controllers.api.v1.authController.forgotPassword
);
apiRouter.get(
  "/api/v1/verify-token",
  controllers.api.v1.authController.verifyForgotPasswordLink
);
apiRouter.put(
  "/api/v1/password-reset",
  controllers.api.v1.authController.resetPassword
);

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
  "/api/v1/product/:id",
  controllers.api.v1.productController.findOneProduct
);

apiRouter.put(
  "/api/v1/product/update/:id",
  uploadOnMemory.array("picture", 4),
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
apiRouter.get(
  "/api/v1/products/filter/:category",
  controllers.api.v1.productController.findProductsByCategory
);

//Offered product
apiRouter.get(
  "/api/v1/products/offered/:id",
  controllers.api.v1.penawaranController.findThisOffer
);
apiRouter.post(
  "/api/v1/products/offer",
  controllers.api.v1.penawaranController.createPenawaran
);
apiRouter.get(
  "/api/v1/products/offer",
  controllers.api.v1.penawaranController.findAllByIdBuyer
); //find by id buyer
apiRouter.get(
  "/api/v1/product/offered/:id",
  controllers.api.v1.penawaranController.findOneOffer
);
apiRouter.delete(
  "/api/v1/product/offered/delete/:id",
  controllers.api.v1.penawaranController.destroyPenawaran
);

apiRouter.get(
  "/api/v1/products/alloffer",
  controllers.api.v1.penawaranController.listPenawaran
);

// update offering
apiRouter.put(
  "/api/v1/product/offered/update/:id",
  controllers.api.v1.penawaranController.updateOffering
);

//create a transaction
apiRouter.post(
  "/api/v1/transaction",
  controllers.api.v1.transaksiController.createTransaksi
);

//find one transaction
apiRouter.get(
  "/api/v1/transaction/:id",
  controllers.api.v1.transaksiController.findOneTransaction
);

//find all transactions
apiRouter.get(
  "/api/v1/transactions",
  controllers.api.v1.transaksiController.listTransaksi
);

//destroy transaction
apiRouter.delete(
  "/api/v1/transactions/delete/:id",
  controllers.api.v1.transaksiController.destroyTransaksi
);

// update transaction
apiRouter.put(
  "/api/v1/transactions/update/:id",
  controllers.api.v1.transaksiController.updateTransaction
);

// find Notifikasi by id
apiRouter.get(
  "/api/v1/notif/findmynotif",
  controllers.api.v1.notifikasiController.findMyNotif
);

// update offering
apiRouter.put(
  "/api/v1/notif/update/:id",
  controllers.api.v1.notifikasiController.updateNotification
);

//route not found
apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
