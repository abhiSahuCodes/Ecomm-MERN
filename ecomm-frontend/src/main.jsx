import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./page/Home.jsx";
import About from "./page/About.jsx";
import Contact from "./page/Contact.jsx";
import Login from "./page/Login.jsx";
import Newproduct from "./page/Newproduct.jsx";
import SignUp from "./page/SignUp.jsx";
import Cart from "./page/Cart.jsx";
import { store } from "./redux/index.jsx";
import { Provider } from "react-redux";
import Products from "./components/Products.jsx";
import Product from "./page/Product.jsx";
import Confirmation from "./page/Confirmation.jsx";
import Cancel from "./page/Cancel.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="products" element={<Products />} />
      <Route path="product/:filterby" element={<Product />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="login" element={<Login />} />
      <Route path="newproduct" element={<Newproduct />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="cart" element={<Cart />} />
      <Route path="successful" element={<Confirmation />} />
      <Route path="cancel" element={<Cancel />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
