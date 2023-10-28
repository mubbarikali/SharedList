const express = require('express');

const {getItems, getItem, addItem, updateItem, deleteItem} = require('../controllers/itemsController');
const router = express.Router();


router.route("/").get(getItems).post(addItem);
router.route("/:itemId").get(getItem).delete(deleteItem).put(updateItem);



module.exports = router;