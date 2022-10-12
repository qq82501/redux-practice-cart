import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const initialFetchData = function () {
  return async function fetchDataThunk(dispatch, getState) {
    console.log(getState().cart);
    try {
      const res = await fetch(
        "https://redux-cart-practice-b16fa-default-rtdb.firebaseio.com/cart.json"
      );
      if (!res.ok) throw new Error("fatching data failed");
      const data = await res.json();
      if (!data.cartItems) return;
      if (data) dispatch(cartActions.fetchData(data));
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "fetch failed",
          message: err.message,
        })
      );
    }
  };
};

export const updateBackend = function (items) {
  console.log(items);
  return async function updateBackendThunk(dispatch) {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        message: "sending data",
        title: "sending",
      })
    );
    const httpRequset = async function (items) {
      const res = await fetch(
        "https://redux-cart-practice-b16fa-default-rtdb.firebaseio.com/.json",
        {
          method: "PATCH",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify({ cart: items }),
        }
      );
      if (!res.ok) throw new Error();
    };
    try {
      await httpRequset(items);
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          message: "sending data failed",
          title: "fail",
        })
      );
    }
    dispatch(
      uiActions.showNotification({
        status: "success",
        message: "sending data completely",
        title: "success",
      })
    );
  };
};
