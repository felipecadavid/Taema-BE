const Product = require("./product.model");
const cloudinary = require("cloudinary").v2;

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
    console.log(req.query);
    const queryArray = Object.values(req.query);
    const idList = queryArray.map((product) => JSON.parse(product).product);
    const promises = idList.map(async (id) => {
      return await Product.findOne({ _id: id });
    });
    const productList = await Promise.all(promises);

    const productListWithQuantitiesAndCardMessage = productList.map((product) => {
      const {
        _id,
        name,
        image,
        price,
        totalPrice,
        discount,
        description,
        additions,
        hasCard
      } = product;
      const quantity = JSON.parse(
        queryArray.find((product) => _id.equals(JSON.parse(product).product))
      ).quantity;
      const cardMessage = JSON.parse(
        queryArray.find((product) => _id.equals(JSON.parse(product).product))
      ).cardMessage;
      return {
        _id,
        name,
        image,
        totalPrice,
        price,
        discount,
        description,
        additions,
        quantity,
        cardMessage,
        hasCard
      };
    });
    res.status(200).send(productListWithQuantitiesAndCardMessage);
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

async function searchProducts(req, res) {
  // READ
  try {
    const { q } = req.query;
    console.log(q);
    const products = await Product.find({
      $text: { $search: q },
    });
    res.status(200).send(products);
  } catch (error) {
    console.log(error);

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
    const { name, price, discount, description, stock, image, additions, category, hasCard } =
      req.body;
    const newProduct = await Product.create({
      name,
      image,
      price,
      discount,
      description,
      additions,
      category,
      hasCard,
      stock
    });
    res.status(200).send(`Created new Product: ${newProduct}`);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

async function uploadImage(req, res) {
  // CREATE
  try {
    cloudinary.uploader.upload(req.files.image.file, (error, result) => {
      if (error) {
        return next();
      }
      const url = result.url;
      res.status(200).send(url);
    });
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
      stock,
      totalPrice
    } = req.body;
    await Product.updateOne(
      { _id },
      { name, image, price, discount, description, additions, stock, totalPrice }
    );
    res.status(200).send(`Updated product with ID ${_id}`);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function deleteProduct(req, res) {
  // DELETE
  try {
    const { id: _id } = req.params;
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
  uploadImage,
  searchProducts
};
