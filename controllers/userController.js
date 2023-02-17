const User = require("../models/user");
const config = require("../config/index");

const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

/* exports.user = async (req, res, next) => {
  const user = await new User.find();
  res.status(200).json({
    data: user,
  });
}; */

exports.user = async (req, res, next) => {
  const user = await User.find();
  res.status(200).json({
    data: user,
  });
};

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    ///validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("ข้อมูลที่ได้รับมาไม่ถูกต้อง");
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    }
    const existEmail = await User.findOne({ email: email });
    if (existEmail) {
      const error = new Error("อีเมลนี้มีผู้ใช้งานในระบบแล้ว");
      error.statusCode = 400;
      throw error;
    }
    
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = await user.pa(password);
    await user.save();
    res.status(200).json({
      message: "ลงทะเบียนเรียบร้อยแล้ว",
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    ///validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("ข้อมูลที่ได้รับมาไม่ถูกต้อง");
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    }
    const user = await User.findOne({ email: email });
    ///checkEmail
    if (!user) {
      const error = new Error("ไม่พบผู้ใช้งาน");
      error.statusCode = 404;
      throw error;
    }
    const isValid = await user.checkPassword(password);
    if (!isValid) {
      const error = new Error("รหัสผ่านไม่ถูกต้อง");
      error.statusCode = 401;
      throw error;
    }
    /// create token
    const token = await jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      config.JWT_SECRET,
      { expiresIn: "5 days" }
    );
    
    ///แสดงผล
    const expires_in = jwt.decode(token);
    res.status(200).json({
      access_token: token,
      expires_in: expires_in.exp,
      token_type: "Beaere",
      //message:"ล็อกอินสำเร็จ"
    });
  } catch (error) {
    next(error);
  }
};

exports.profile = (req, res, next) => {
  const {role,name,email} = req.user
  res.status(200).json({ 
    name:name,
    email:email,
    role:role,
   //user:req.user
   });
};