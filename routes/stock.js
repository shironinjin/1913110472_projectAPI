var express = require("express");
var router = express.Router();
const stockController = require("../controllers/stockController");

const checkAd = require("../middleware/checkAdmin");
const passport = require("../middleware/passport");
const { body } = require("express-validator");

router.get("/pr",[passport.islogin], stockController.brandPR);
router.get("/bu", stockController.brand);
router.get("/:id",[passport.islogin], stockController.stock);

router.post(
  "/", [ passport.islogin, checkAd.isAdmin ],
  [body("name").not().isEmpty().withMessage("กรุณาป้อนชื่อแบรนด์")],
  stockController.insertbrand
);

router.post(
  "/:id",
  [passport.islogin, checkAd.isAdmin],
  [
    body("type").not().isEmpty().withMessage("กรุณาป้อนประเภทด้วยค่ะ"),
    body("size").not().isEmpty().withMessage("กรุณาป้อนขนาดด้วยค่ะ"),
    body("color").not().isEmpty().withMessage("กรุณาป้อนสีด้วยค่ะ"),
    body("price").not().isEmpty().withMessage("กรุณาป้อนราคาด้วยค่ะ"),
  ],
  stockController.insertStock
);

router.delete("/:id", [passport.islogin, checkAd.isAdmin], stockController.des);
router.delete("/stock/:id", [passport.islogin, checkAd.isAdmin], stockController.dess);

router.put("/:id", [passport.islogin, checkAd.isAdmin], stockController.update);
router.put("/brand/:id", [passport.islogin, checkAd.isAdmin], stockController.updat);

module.exports = router;
