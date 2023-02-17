const Stock = require("../models/stock");
const Brand = require("../models/brand");
const { validationResult } = require("express-validator");

exports.brand = async (req, res, next) => {
  const brand = await Brand.find().populate("stocks");
  res.status(200).json({
    brand: brand,
  });
};

exports.stock = async (req, res, next) => {
  const { id } = req.params;
  const bra = await Brand.findById(id);
  const stock = await Stock.find();
  if (!bra) {
    res.status(200).json({
      message: "ไม่พบ",
    });
  }
  res.status(200).json({
    stocks: stock,
  });
};

exports.insertStock = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { type, size, color, price } = req.body;

    ///validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("ข้อมูลที่ได้รับมาไม่ถูกต้อง");
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    }

    const stock = new Stock({
      brand: id,
      type: type,
      size: size,
      color: color,
      price: price,
    });
    await stock.save();
    res.status(200).json({
      message: "เพิ่มข้อมูลเรียบร้อย",
    });
  } catch (error) {
    next(error)
  }
};
exports.insertbrand = async (req, res, next) => {
  try {
    const { name } = req.body;
    ///validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("ข้อมูลที่ได้รับมาไม่ถูกต้อง");
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    }
    const bra = new Brand();
    bra.name = name;
    await bra.save();
    res.status(200).json({
      message: "เพิ่มข้อมูลเรียบร้อยแล้ว",
    });
  } catch (error) {
    next(error);
  }
};
exports.des = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await Brand.deleteOne({ _id: id });

    if (brand.deletedCount === 0) {
      const error = new Error("ไม่สามารถลบข้อมูลได้");
      error.statusCode = 400;
      throw error;
    } else {
      res.status(200).json({
        message: "ลบข้อมูลเรียบร้อยแล้ว",
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { type, size, color, price } = req.body;

    const stock = await Stock.findOne({ _id: id });

    if (!stock) {
      const error = new Error("not");
      error.statusCode = 200;
      throw error;
    } else {
      stock.type = type;
      stock.size = size;
      stock.color = color;
      stock.price = price;
      await stock.save();
      res.status(200).json({
        maessge: "แก้ไขข้อมูลเรียบร้อยแล้ว",
      });
    }
  } catch (error) {
    next(error);
  }
};
