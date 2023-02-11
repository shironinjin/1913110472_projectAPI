var express = require("express");
var router = express.Router();
const stockController = require("../controllers/stockController");


router.get("/", stockController.brand);
router.get("/:id", stockController.stock);

router.post("/", stockController.insertbrand);
router.post("/:id", stockController.insertStock);

router.delete("/:id", stockController.des);
router.put("/:id", stockController.update);

module.exports = router;
