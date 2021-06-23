import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_PAYMENT_METHOD,
    CART_SAVE_SHIPPING,
    CART_CLEAR,
    CART_EMPTY
} from "../constants/cartConstants";

function cartReducer(state = { cartItems: [], shipping: {}, payment: {} }, action) {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            const product = state.cartItems.find(x => x.product === item.product);
            if (product) {
                return {
                    cartItems:
                        state.cartItems.map(x => x.product === product.product ? item : x)
                }; //o segundo product é o id do product. O :x retorna o valor inicial do carrinho
            }
            return { cartItems: [...state.cartItems, item] }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload),
            };
        case CART_CLEAR:
            return {
                ...state,
                cartItems: action.payload
            }
        case CART_SAVE_SHIPPING:
            return { ...state, shippingAddress: action.payload };
        case CART_SAVE_PAYMENT_METHOD:
            return { ...state, paymentMethod: action.payload };
        case CART_EMPTY:
            return { ...state, cartItems: [] };
        default:
            return state
    }
}

export { cartReducer }