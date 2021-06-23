import axios from "axios";
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING,
    CART_SAVE_PAYMENT_METHOD,
    CART_CLEAR
} from "../constants/cartConstants";

const addToCart = (productId, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`http://localhost:5000/api/products/` + productId);
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
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

const saveShipping = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_SHIPPING, payload: data });
};

const savePaymentMethod = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
}

const clearCart = () => (dispatch) => {
    dispatch({ type: CART_CLEAR, payload: [] });
}

export { addToCart, removeFromCart, saveShipping, savePaymentMethod, clearCart }