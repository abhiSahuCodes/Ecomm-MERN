import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Products from "../components/Products";
import { addCartItem } from "../redux/productSlice";

const Product = () => {
  const { filterby } = useParams();
  console.log(filterby);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product.productList);
  // const productDisplay = productData.filter((el) => el._id === filterby)[0];
  const productDisplay = productData.find((el) => el._id === filterby);
  console.log(productDisplay);
  const handleAddCartProduct = (e) => {
    e.stopPropagation();
    dispatch(addCartItem(productDisplay));
  };

  const handleBuy = (e) => {
    e.stopPropagation();
    dispatch(addCartItem(productDisplay));
    navigate("/cart")
  }
  return (
    <div className="p-2 md:p-4">
      {productDisplay && (
        <div className="max-w-4xl bg-slate-200 m-auto grid md:grid-cols-2 grid-cols-1 justify-items-center p-2 md:p-4 shadow-xl rounded-lg">
          <div className="overflow-hidden w-1/2 flex items-center object-cover">
            <img
              src={productDisplay.image}
              alt={productDisplay.name}
              className="rounded-md hover:scale-105 transition-all w-full "
            />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-slate-600  capitalize text-2xl md:text-4xl">
              {productDisplay.name}
            </h3>
            <p className=" text-slate-500  font-medium text-2xl">
              {productDisplay.category}
            </p>
            <p className=" font-bold md:text-2xl">
              <span className="text-red-500 ">₹</span>
              <span>{productDisplay.price}</span>
            </p>
            <div className="flex gap-3">
              <button className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 min-w-[100px]" onClick={handleBuy}>
                Buy
              </button>
              <button
                onClick={handleAddCartProduct}
                className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 min-w-[100px]"
              >
                Add Cart
              </button>
            </div>
            <div>
              <p className="text-slate-600 font-medium">Description : </p>
              <p>{productDisplay.description}</p>
            </div>
          </div>
        </div>
      )}
      <div className="my-[4rem]">
        <Products heading={"Related Products"} />
      </div>
    </div>
  );
};

export default Product;
