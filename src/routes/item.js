const express = require('express');
const router = express.Router();
const itemController = require("../controllers/itemController");
const validation = require("./validation");

router.get("/items", itemController.index);
router.post("/item/create", validation.validateItems, itemController.create);
router.delete("/item/:id", itemController.destroy);
router.get("/item/:id/edit", itemController.edit);
router.post("/item/:id/update", validation.validateItems, itemController.update);
router.post("/item/:id/purchase", itemController.setPurchase);

module.exports = router;