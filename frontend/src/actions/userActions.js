import Axios from "axios";
import Cookie from "js-cookie";
import {
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_SIGNOUT
} from "../constants/userContants";

const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
        const { data } = await Axios.post("http://localhost:5000/api/users/signin", { email, password });
        /* console.log(data) */
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        Cookie.set('userInfo', JSON.stringify(data)); //se fehcar a aplicação e abrir, vai ficar aberto nesse cookie 
    } catch (error) {
        console.log(error)
        dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
    }
}

const register = (name, email, password) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });
    try {
        const { data } = await Axios.post("http://localhost:5000/api/users/register", { name, email, password });
        /* console.log(data) */
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        Cookie.set('userInfo', JSON.stringify(data)); //se fehcar a aplicação e abrir, vai ficar aberto nesse cookie 
    } catch (error) {
        console.log(error)
        dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
    }
}

const signout = () => (dispatch) => {
    const Cookies = Cookie.get()
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress')
    Cookie.remove('userInfo');
    dispatch({ type: USER_SIGNOUT });
}

export { signin, register, signout };