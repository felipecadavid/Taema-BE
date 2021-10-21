const Category = require("./category.model");

async function getCategories(req, res) {
  // READ
  try {
    const categories = await Category.find({});
    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function createCategory(req, res) {
  // CREATE
  try {
    const { name, image } = req.body;
    const newCategory = await Category.create({ name, image });
    res.status(200).send(`Created new category: ${newCategory}`);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function editCategory(req, res) {
  // UPDATE
  try {
    const { name, image, id: _id } = req.body;
    await Category.updateOne({ _id }, { name, image });
    res.status(200).send(`Updated category with ID ${_id}`);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function deleteCategory(req, res) {
  // DELETE
  try {
    const { id: _id } = req.body;
    await Category.deleteOne({ _id });
    res.status(200).send(`Deleted category with ID ${_id}`);
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = { getCategories, createCategory, editCategory, deleteCategory };
