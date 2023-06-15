
import express from "express";
import { uploadProduct, getProducts } from "../controllers/productController.js";

const router = express.Router();

router.post("/uploadProduct", uploadProduct);
router.get("/product", getProducts);

export default router;
