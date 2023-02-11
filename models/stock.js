const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    type: { type: String },
    size: { type: String },
    color: { type: String },
    price: { type: Number },
    brand: { type: Schema.Types.ObjectId, ref: "brands" },
  },
  {
    toJSON: { virtuals: true },
    timestamps: true,
    collection: "stocks",
  }
);
const stock = mongoose.model("Stock", schema);

module.exports = stock;
