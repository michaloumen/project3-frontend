import React, { useEffect } from 'react';
import CheckoutSteps from '../components/CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderContants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function PlaceOrderPage() {
    let history = useHistory();

    const orderCreate = useSelector(state => state.orderCreate);
    const { loading, success, error, order } = orderCreate;

    const cart = useSelector(state => state.cart);

    const toPrice = (num) => Number(num.toFixed(2)); //5.123 => '5.12' => 5.12
    cart.itemsPrice = toPrice(cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0));

    cart.taxPrice = toPrice(0.02 * cart.itemsPrice);
    cart.totalPrice = toPrice(cart.itemsPrice + cart.taxPrice);
    const dispatch = useDispatch();

    const placeOrderHandler = () => {
        dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
    };

    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`);
            dispatch({ type: ORDER_CREATE_RESET });
        }
    }, [dispatch, order, history, success]);

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <div className="row">
                <div className="col-2">
                    <div>
                        <div className="card card-body">
                            <h2>Pedido</h2>
                            <p>
                                <strong>Name: </strong> {cart.shippingAddress.fullName} <br />
                                <strong>Address: </strong> {cart.shippingAddress.address},
                                {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="card card-body">
                            <h2>Pagamento</h2>
                            <p>
                                <strong>Method: </strong> {cart.paymentMethod}
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="card card-body">
                            <h2>Tipo de pagamento</h2>
                            {cart.cartItems.map(item =>
                                <div>
                                    <div className="row">
                                        <img className="small" src={item.image} alt="product" />
                                    </div>
                                    <div className="min-30">
                                        <Link to={"/product/" + item.product}>
                                            {item.name}
                                        </Link>
                                    </div>
                                    <div className="cart price">
                                        {item.qty} x R$ {item.price} = ${item.qty * item.price}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul className="orderSumary">

                            <h2>Resumo do Pedido</h2>


                            <div className="row">
                                <div>Itens</div>
                                <div>R$ {cart.itemsPrice}</div>
                            </div>

                            <div className="row">
                                <div>Frete</div>
                                <div>R$ {cart.taxPrice}</div>
                            </div>


                            <div className="row">
                                <div><strong>Total</strong></div>
                                <div><strong>R$ {cart.totalPrice}</strong></div>
                            </div>


                            <button
                                type="button"
                                onClick={placeOrderHandler}
                                className="primary button full-width"
                                disabled={cart.cartItems.length === 0}
                            >
                                Fechar pedido
                            </button>
                            {loading && <LoadingBox></LoadingBox>}
                            {error && <MessageBox variant="danger">{error}</MessageBox>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaceOrderPage;