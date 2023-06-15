
import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;
