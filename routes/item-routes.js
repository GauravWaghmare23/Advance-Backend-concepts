const express = require("express");
const { asyncHandler } = require("../middleware/errorHandler.js");
const {
  getItem,
  addItem,
  updateItem,
  deleteItem,
} = require("../controllers/items.controller.js");

const router = express.Router();

router.get("/items", asyncHandler(getItem));

router.post("/items", asyncHandler(addItem));

router.put("/items/:id", asyncHandler(updateItem));

router.delete("/items/:id", asyncHandler(deleteItem));

module.exports = router;
