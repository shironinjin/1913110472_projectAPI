const Stock = require("../models/stock");


exports.stock = async (req, res, next) => {
  const stock = await Stock.find();
  res.status(200).json({
    data: stock,
  });
};

exports.insert = async (req, res, next) => {
  const { brand, type, size, color, price } = req.body;
  const stock = new Stock({
    brand: brand,
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

exports.del = async (req, res, next) => {
  try {
    const { id } = req.parems;
    const stock = await Stock.deleteOne({_id: id,});
    if (stock.deleteCount === 0) {
      const error = new Error("ไม่สามารถลบข้อมูลได้");
      error.statusCode = 200;
      throw error;
    } else {
      res.status(200).json({
        message: "ลบข้อมูลเรียบร้อย",
      });
    }
  } catch (error) {
    next(error);
  }
};
