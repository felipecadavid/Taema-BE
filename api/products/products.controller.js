const Product = require("./product.model");

async function getASpecificProduct(req, res) {
  // READ
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return res.status(404).send("Product not found");
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
}

async function getProducts(req, res) {
  // READ
  try {
    const products = await Product.find({});
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function getProductsByCategory(req, res) {
  // READ
  try {
    const { category } = req.params;
    const products = await Product.find({ category });
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function createProduct(req, res) {
  // CREATE
  try {
    const { name, image, price, discount, description, additions, category } = req.body;
    const newProduct = await Product.create({
      name,
      image,
      price,
      discount,
      description,
      additions,
      category,
    });
    res.status(200).send(`Created new Product: ${newProduct}`);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function editProduct(req, res) {
  // UPDATE
  try {
    const {
      id: _id,
      name,
      image,
      price,
      discount,
      description,
      additions,
    } = req.body;
    await Product.updateOne(
      { _id },
      { name, image, price, discount, description, additions }
    );
    res.status(200).send(`Updated product with ID ${_id}`);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function deleteProduct(req, res) {
  // DELETE
  try {
    const { id: _id } = req.body;
    await Product.deleteOne({ _id });
    res.status(200).send(`Deleted product with ID ${_id}`);
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  getASpecificProduct,
  getProducts,
  createProduct,
  editProduct,
  deleteProduct,
  getProductsByCategory
};
