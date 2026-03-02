import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authApi } from "../../apis/auth";
import { addOrIncrementInCart, clearCart, decrementOrRemoveInCart, removeItemInCart,setCartItems } from "../../redux/cartSlice";





const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);


  const fetchCart = async () => {
    try {
      const res = await authApi.myCart();
      console.log(res)
      if (res?.cart) {
        dispatch(setCartItems(res.cart));
      }
    } catch (error) {
      console.error("Fetch cart error:", error);
    }
  };

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      fetchCart();
    }
  }, []);


  const increaseQty = async (item) => {
    try {
      const payload = {
        productId: item.productId,
        quantity: item.quantity + 1,
      };
      const res = await authApi.updateQuantity(payload);
      console.log(res)
      dispatch(
      addOrIncrementInCart({
          productId: item.productId,
          quantity: item.quantity + 1,
        })
      );
    } catch (error) {
      console.error("Increase qty error:", error);
    }
  };

  const decreaseQty = async (item) => {
    if (item.quantity <= 1) return;
    try {
      const payload = {
        productId: item.productId,
        quantity: item.quantity - 1,
      };

      const res = await authApi.updateQuantity(payload);
      console.log(res)
      dispatch(
        decrementOrRemoveInCart({
          productId: item.productId,
          quantity: item.quantity - 1,
        })
      );
    } catch (error) {
      console.error("Decrease qty error:", error);
    }
  };


  const handleRemoveItem = async (productId) => {
    try {
     const res =  await authApi.removeItemFromCart(productId);
     console.log(res)
      dispatch(removeItemInCart(productId));
    } catch (error) {
      console.error("Remove item error:", error);
    }
  };


  const handleClearCart = async () => {
    try {
      const res = await authApi.clearCart();
      console.log(res)
      dispatch(clearCart());
    } catch (error) {
      console.error("Clear cart error:", error);
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-500 text-xl">
        Your cart is empty 🛒
      </div>
    );
  }


  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">My Cart</h2>


      <div className="flex justify-end mb-4">
        <button
          onClick={handleClearCart}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Clear Cart
        </button>
      </div>

   
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cartItems.map((item) => (
          <div
            key={item.productId}
            className="border rounded-xl p-4 shadow-sm hover:shadow-md transition bg-white"
          >
            
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-48 object-cover rounded-lg mb-3"
            />

          
            <h3 className="font-semibold text-lg">{item.name}</h3>

        
            <p className="text-green-600 font-medium mb-2">
              ₹{item.price}
            </p>

            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={() => decreaseQty(item)}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                −
              </button>

              <span className="font-semibold">{item.quantity}</span>

              <button
                onClick={() => increaseQty(item)}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>
            
            {/* chekc out btn navigate to all order page for further process  */}
           <button onClick={() => {
       
        navigate(`/order`);
      }}>
          Proceed
           </button>
            <button
              onClick={() => handleRemoveItem(item.productId)}
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Remove Item
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;