import axios from "axios";
import Cookie from "js-cookie";
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING,
    CART_SAVE_PAYMENT_METHOD
} from "../constants/cartConstants";

const addToCart = (productId, qty) => async (dispatch, getState) => {
    const { data } = await axios.get("http://localhost:5000/api/products/" + productId);
    dispatch({
        type: CART_ADD_ITEM, payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        },
    });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: productId });

    const { cart: { cartItems } } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
}

const saveShipping = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_SHIPPING, payload: data });
    localStorage.setItem('shippingAddress', JSON.stringify(data));
};

const savePaymentMethod = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
}

export { addToCart, removeFromCart, saveShipping, savePaymentMethod }