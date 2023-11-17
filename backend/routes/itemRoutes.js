const express = require('express');
const {getItems, getItem, addItem, updateItem, deleteItem} = require('../controllers/itemController');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware')


router.route("/").get(protect, getItems).post(protect, addItem);
router.route("/:itemId").get(protect, getItem).delete(protect, deleteItem).put(protect, updateItem);


module.exports = router;