import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import stripePackage from "stripe";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 8080;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connect to MongoDB successfully"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Running Server");
});

app.use(userRoutes);
app.use(productRoutes);

const stripe = new stripePackage(process.env.STRIPE_SECRET_KEY);

app.post("/create-checkout-session", async (req, res) => {
  try {
    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options: [{ shipping_rate: "shr_1NIwsdSHNMwstvuQ6nencBgt" }],
      line_items: req.body.map((item) => {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.name,
            },
            unit_amount: item.price * 100,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.qty,
        };
      }),
      success_url: `${process.env.FRONTEND_URL}/successful`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    };

    const session = await stripe.checkout.sessions.create(params);
    res.status(200).json(session.id);
  } catch (err) {
    res.status(err.statusCode || 500).json(err.message);
  }
});

app.listen(PORT, () => console.log("Server is running successfully at port: " + PORT));
