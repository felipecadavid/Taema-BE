const { Router } = require("express");
const bb = require("express-busboy");
const controller = require("./products.controller");

const auth = require("../../auth/auth.service");

const app = new Router();

//Endpoints
app.get("/", auth.verifyAdmin, controller.getProducts);
app.get("/categories/:category", controller.getProductsByCategory);
app.get("/getAList", controller.getAListOfProducts);
app.get("/getOne/:id", controller.getASpecificProduct);
app.get("/search", controller.searchProducts);
app.put("/", auth.verifyAdmin, controller.editProduct);
app.delete("/:id", auth.verifyAdmin, controller.deleteProduct);
app.post("/", auth.verifyAdmin, controller.createProduct);

bb.extend(app, {
  upload: true,
  path: "uploads",
  allowedPath: /./,
});
app.post("/image", auth.verifyAdmin, controller.uploadImage);

module.exports = app;
