var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");
const { body } = require("express-validator");

const checkAd = require("../middleware/checkAdmin");
const passport = require('../middleware/passport')

router.get("/",[passport.islogin,checkAd.isAdmin],userController.user);

router.post(
  "/",
  [
    body("name").not().isEmpty().withMessage("กรุณาป้อนชื่อด้วยค่ะ"),
    body("email").not().isEmpty().withMessage("กรุณาป้อนอีเมลด้วยค่ะ").isEmail().withMessage("รูปแบบอีเมลไม่ถูกต้อง"),
    body("password").not().isEmpty().withMessage("กรุณาป้อนรหัสผ่านด้วยค่ะ").withMessage("รหัสผ่านต้องมีมากกว่า 5 ตัวอักษรขึ้นไป"),
  ],
  userController.register
);
router.post(
  "/login",
  body("email").not().isEmpty().withMessage("กรุณาป้อนอีเมลด้วย").isEmail().withMessage("รูปแบบอีเมลไม่ถูกต้อง"),
  body("password").not().isEmpty().withMessage("กรุณากรองรหัสผ่านด้วย").isLength({ min: 5 }).withMessage("รหัสผ่านต้องมีมากกว่า 5 ตัวอักษรขึ้นไป"),
  userController.login
);

router.get('/me',[passport.islogin],userController.profile)

module.exports = router;
