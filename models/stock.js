const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    brand: String,
    type:String,
    size:String,
    color:String,
    price:Number,
  },{ collection: "stocks" });

const stock = mongoose.model("Stock", schema);

module.exports = stock;
