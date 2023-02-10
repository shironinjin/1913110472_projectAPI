const Stock = require("../models/stock");
const Brand = require("../models/brand");


exports.stock = async (req, res, next) => {
  const stock = await Stock.find();
  return res.status(200).json({
    stocks: stock,
  });
};

exports.brand = async (req, res, next) => {
  const brand = await Brand.find().populate("stocks");
  return res.status(200).json({
    brand: brand,
  });
};

exports.insertStock = async (req, res, next) => {
  const { type, size, color, price } = req.body;
  const stock = new Stock({
    //brand: brand,
    type: type,
    size: size,
    color: color,
    price: price,
  });
  await stock.save();
  res.status(200).json({
    message: "เพิ่มข้อมูลเรียบร้อย",
  });
};

/* exports.insertBrand = async (req, res, next) => {
  const { name } = req.body;
  const brand = new Brand({
    name: name,
  });
  await brand.save();
  res.status(200).json({
    message: "เพิ่มข้อมูลเรียบร้อย",
  });
};
 */

exports.des = async (req, res, next) => {
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

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { brand, type, size, color, price } = req.body;

    const stock = await Stock.findOne({ _id: id });

    if (!stock) {
      const error = new Error("not");
      error.statusCode = 200;
      throw error;
    } else {
      stock.brand = brand;
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


