import React, { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { updateBackend } from "./store/cart-thunk-action";
import Notification from "./components/UI/Notification";
import { initialFetchData } from "./store/cart-thunk-action";

let ini = true;

function App() {
  const dispatch = useDispatch();
  const isCartOpen = useSelector((state) => state.ui.isCartOpen);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    if (ini) {
      dispatch(initialFetchData());
      ini = false;
      return;
    }
    if (cart.changed)
      dispatch(
        updateBackend({
          cartItems: cart.cartItems,
          cartQuantity: cart.cartQuantity,
        })
      );
  }, [cart, dispatch]);
  return (
    <React.Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {isCartOpen && <Cart />}
        <Products />
      </Layout>
    </React.Fragment>
  );
}

export default App;
