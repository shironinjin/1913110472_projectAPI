var express = require("express");
var router = express.Router();
const stockController = require("../controllers/stockController");

router.get("/stock", stockController.stock);
router.get("/brand", stockController.brand);

router.post("/stock", stockController.insertStock);
/* router.post("/brand", stockController.insertBrand); */

router.delete("/:id", stockController.des);
router.put("/:id", stockController.update);

module.exports = router;
