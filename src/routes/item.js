const express = require('express');
const router = express.Router();
const itemController = require("../controllers/itemController");

router.get("/items", itemController.index);
router.post("/item/create", itemController.create);
router.delete("/item/:id", itemController.destroy);
router.get("/item/:id/edit", itemController.edit);
router.post("/item/:id/update", itemController.update);

module.exports = router;