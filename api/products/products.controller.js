const Product = require("./product.model");

async function getASpecificProduct(req, res) {
  // READ
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    console.log(product);
    if (!product) return res.status(404).send("Product not found");
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
}

async function getAListOfProducts(req, res) {
  // READ
  try {
    console.log(req.query)
    const queryArray = Object.values(req.query);
    const idList = queryArray.map((product) => JSON.parse(product).product);
    const promises = idList.map(async (id) => {
      return await Product.findOne({ _id: id })
    });
    const productList = await Promise.all(promises);
    
    const productListWithQuantities = productList.map((product) => {
      const { _id, name, image, price, totalPrice, discount, description, additions } = product;
      const quantity = JSON.parse(queryArray.find((product) => _id.equals(JSON.parse(product).product))).quantity;
      return { _id, name, image, totalPrice, price, discount, description, additions, quantity };
    });
    res.status(200).send(productListWithQuantities);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
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
    const {
      name,
      image,
      price,
      discount,
      description,
      additions,
      category,
      hasCard,
    } = req.body;
    const newProduct = await Product.create({
      name,
      image,
      price,
      discount,
      description,
      additions,
      category,
      hasCard,
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
  getAListOfProducts,
  createProduct,
  editProduct,
  deleteProduct,
  getProductsByCategory,
};
