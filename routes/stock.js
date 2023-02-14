var express = require("express");
var router = express.Router();
const stockController = require("../controllers/stockController");

router.use(express.json());
const { body } = require("express-validator");

router.get("/", stockController.brand);
router.get("/:id", stockController.stock);

router.post(
  "/",
  [body("name").not().isEmpty().withMessage("กรุณาป้อนชื่อด้วยค่ะ")],
  stockController.insertbrand
);
router.post(
  "/:id",
  [
    body("type").not().isEmpty().withMessage("กรุณาป้อนประเภทด้วยค่ะ"),
    body("size").not().isEmpty().withMessage("กรุณาป้อนขนาดด้วยค่ะ"),
    body("color").not().isEmpty().withMessage("กรุณาป้อนสีด้วยค่ะ"),
    body("price").not().isEmpty().withMessage("กรุณาป้อนราคาด้วยค่ะ"),
  ],
  stockController.insertStock
);

router.delete("/:id", stockController.des);
router.put("/:id", stockController.update);

module.exports = router;
