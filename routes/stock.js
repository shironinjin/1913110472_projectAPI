var express = require("express");
var router = express.Router();
const stockController = require("../controllers/stockController")

router.get("/",stockController.stock);

router.post("/",stockController.insert);

router.delete("/:id",stockController.del);


module.exports = router;