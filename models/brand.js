const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    name: { type: String, require: true, trim: true },
  },
  {
    toJSON: { virtuals: true },
    timestamps: true,
    collection: "brands",
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    virtuals: {
      stocks: {
        Option: {
          ref: "Sgtock",
          localField: "_id",
          foreignField: "brand",
        },
      },
    },
  }
);
/* schema.virtual("stocks", {
  ref: "Stock",
  localField: "_id",
  foreignField: "brand",
}); */

const brand = mongoose.model("Brand", schema);

module.exports = brand;
