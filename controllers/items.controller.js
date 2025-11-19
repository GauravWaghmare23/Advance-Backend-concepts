// Import your custom error class
const { APIError } = require("../middleware/errorHandler.js"); 

const items = [
  { id: 1, name: "Item 1", description: "Item 1 description" },
  { id: 2, name: "Item 2", description: "Item 2 description" },
  { id: 3, name: "Item 3", description: "Item 3 description" },
  { id: 4, name: "Item 4", description: "Item 4 description" },
  { id: 5, name: "Item 5", description: "Item 5 description" },
];

async function getItem(req, res) {
  res.status(200).json({
    status: "success",
    results: items.length,
    data: items,
  });
}

async function addItem(req, res) {
  const { name, description } = req.body;


  if (!name || !description) {
    throw new APIError("Name and Description are required", 400);
  }

  const newItem = {
    id: items.length + 1,
    name,
    description,
  };

  items.push(newItem);

  res.status(201).json({
    status: "success",
    data: newItem,
  });
}

async function updateItem(req, res) {
  const { id } = req.params;
  const { name, description } = req.body;

  const item = items.find((item) => item.id === parseInt(id));

  if (!item) {

    throw new APIError("Item not found", 404);
  }

  item.name = name || item.name;
  item.description = description || item.description;

  res.status(200).json({
    status: "success",
    data: item,
  });
}

async function deleteItem(req, res) {
  const { id } = req.params;
  const itemIndex = items.findIndex((item) => item.id === parseInt(id));

  if (itemIndex === -1) {
    throw new APIError("Item not found", 404);
  }

  items.splice(itemIndex, 1);
  res.status(200).json({
    status: "success",
    message: "Item deleted successfully",
  });
}

module.exports = { getItem, addItem, updateItem, deleteItem };
