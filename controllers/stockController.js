const Stock = require("../models/stock");
const Brand = require("../models/brand");
const { validationResult } = require("express-validator");

// get stock all
exports.brand = async (req, res, next) => {
  const brand = await Brand.find().select("name");
  res.status(200).json({
    brand: brand,
  });
};
// get login
exports.brandPR = async (req, res, next) => {
  const brand = await Brand.find().populate("stocks", ["type","size","color","price"]).select("name");
  res.status(200).json({
    brand: brand,
  });
};

// get stock id brand
exports.stock = async (req, res, next) => {
  const { id } = req.params;
  const bra = await Brand.findById(id).populate("stocks", ["type","size","color","price"]).select("name");
  if (!bra) {
    res.status(200).json({
      message: "ไม่พบสินค้า",
    });
  }
  res.status(200).json({
    stocks: bra,
  });
};

// insert brand
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

// insert stock
exports.insertStock = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { type, size, color, price } = req.body;
    const brand = await Brand.findById(id);

    if(!brand) {
      const error = new Error("ไม่พบแบรนด์");
      error.statusCode = 400;
      throw error;
    }
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

// delete brand
exports.des = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await Brand.deleteOne({ _id: id });
    await Stock.deleteMany({brand: id});

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

// delete stock
exports.dess = async (req, res, next) => {
  try {
    const { id } = req.params;
    const stock = await Stock.deleteOne({ _id: id });

    if (stock.deletedCount === 0) {
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

// update brand
exports.updat = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name} = req.body;

    const brand = await Brand.findOne({ _id: id });

    if (!brand) {
      const error = new Error("not");
      error.statusCode = 200;
      throw error;
    } else {
      brand.name = name;
    
      await brand.save();
      res.status(200).json({
        maessge: "แก้ไขข้อมูลเรียบร้อยแล้ว",
      });
    }
  } catch (error) {
    next(error);
  }
};

// update stock
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
