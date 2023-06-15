import { useSelector } from "react-redux";
import CartProduct from "../components/CartProduct";
import emptyCartImage from "../assets/empty.gif"
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const Cart = () => {
  const productCartItem = useSelector((state) => state.product.cartItem);
  console.log(productCartItem);
  const user = useSelector(state => state.user)
  const navigate = useNavigate()

  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );

  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );

  const handlePayment = async()=>{

    if(user.email){
        
        const stripePromise = await loadStripe(import.meta.env.VITE_REACT_APP_STRIPE_PUBLIC_KEY)
        const res = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_DOMAIN}/create-checkout-session`,{
          method : "POST",
          headers  : {
            "content-type" : "application/json"
          },
          body  : JSON.stringify(productCartItem)
        })
        if(res.statusCode === 500) return;

        const data = await res.json()
        console.log(data)

        toast("Redirecting to payment Gateway...")
        stripePromise.redirectToCheckout({sessionId : data}) 
    }
    else{
      toast("You have not Login!")
      setTimeout(()=>{
        navigate("/login")
      },1000)
    }
  
}
  
  return (
    <>
      <div className="p-2 md:p-4">
        <h2 className="text-lg md:text-2xl font-bold text-slate-600">
          Your Cart Items
        </h2>
        {productCartItem[0] ? (
          <div className="flex flex-col md:flex-row">
            <div>
              {productCartItem.map((el) => {
                return (
                  <CartProduct
                    key={el._id + `${el.name}`}
                    id={el._id}
                    name={el.name}
                    image={el.image}
                    category={el.category}
                    qty={el.qty}
                    price={el.price}
                    total={el.total}
                  />
                );
              })}
            </div>
            <div className="w-full max-w-md  ml-auto rounded-lg">
              <h2 className="bg-blue-500 text-white p-2 text-lg rounded-lg">Summary</h2>
              <div className="flex w-full py-2 text-lg border-b">
                <p>Total Qty :</p>
                <p className="ml-auto w-32 font-bold">{totalQty}</p>
              </div>
              <div className="flex w-full py-2 text-lg border-b">
                <p>Total Price</p>
                <p className="ml-auto w-32 font-bold">
                  <span className="text-red-500">₹</span> {totalPrice}
                </p>
              </div>
              <button className="bg-red-500 w-full text-lg font-bold py-2 text-white rounded-lg" onClick={handlePayment}>
                Payment
              </button>
              <p>Use 4242 4242 4242 4242 as card number and a valid future expiry date for checkout in payment section</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex w-full justify-center items-center flex-col">
              <img src={emptyCartImage} className="w-full max-w-sm" />
              <p className="text-slate-500 text-3xl font-bold">Empty Cart</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
