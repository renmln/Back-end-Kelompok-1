const express = require("express");
const cors = require("cors");

const controllers = require("../app/controllers");
const uploadOnMemory = require("../app/uploadOnMemory");
const apiRouter = express.Router();

apiRouter.use(cors());

//API
apiRouter.get("/", controllers.api.main.index);

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
// Find All Product in Homepage
apiRouter.get(
  "/api/v1/products",
  controllers.api.v1.productController.findAllProduct
);
// Find Product By IdSeller in Daftar Jual
apiRouter.get(
  "/api/v1/product",
  controllers.api.v1.productController.findMyProduct
);
// Add Product
apiRouter.post(
  "/api/v1/product",
  uploadOnMemory.array("picture", 4),
  controllers.api.v1.productController.addProduct
);
apiRouter.get(
  "/api/v1/product/:id",
  controllers.api.v1.productController.findOneProduct
);
// Edit Product
apiRouter.put(
  "/api/v1/product/update/:id",
  uploadOnMemory.array("picture", 4),
  controllers.api.v1.productController.updateProduct
);
// destroy product
apiRouter.delete(
  "/api/v1/product/destroy/:id",
  controllers.api.v1.productController.destroyProduct
);
// Upload Product Images
apiRouter.put(
  "/api/v1/products/cloudinary",
  uploadOnMemory.array("picture", 4),
  controllers.api.v1.productController.uploadProductImages
);

//Offered product
apiRouter.get(
  "/api/v1/products/alloffer",
  controllers.api.v1.penawaranController.listPenawaran
);
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
// update offering
apiRouter.put(
  "/api/v1/product/offered/update/:id",
  controllers.api.v1.penawaranController.updateOffering
);

// Transaction
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
// update transaction
apiRouter.put(
  "/api/v1/transactions/update/:id",
  controllers.api.v1.transaksiController.updateTransaction
);
//destroy transaction
apiRouter.delete(
  "/api/v1/transactions/delete/:id",
  controllers.api.v1.transaksiController.destroyTransaksi
);

// Notification
// find Notifikasi by id
apiRouter.get(
  "/api/v1/notif/findmynotif",
  controllers.api.v1.notifikasiController.findMyNotif
);
// update notif offering
apiRouter.put(
  "/api/v1/notif/update/:id",
  controllers.api.v1.notifikasiController.updateNotification
);

//route not found
apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
