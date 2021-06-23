import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { createOrder } from '../actions/orderActions';
import { detailsOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function OrderPage() {
    const { id: orderId } = useParams();

    console.log(orderId)
    const cartDetails = useSelector(state => state.cart);
    const orderDetails = useSelector(state => state.orderDetails);
    const { cart } = cartDetails;
    const { order, loading, error } = orderDetails;
    const dispatch = useDispatch();

    /*     const placeOrderHandler = () => {
            dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
        }; */

    useEffect(() => {
        dispatch(detailsOrder(orderId));
    }, [dispatch, orderId]);

    console.log(orderDetails)
    console.log(cartDetails)

    return loading ? (
        <LoadingBox></LoadingBox>
    ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
    ) : (
        <div>
            <h1>Order {order._id}</h1>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shippring</h2>
                                {
                                    cart &&
                                    <p>
                                        <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                                        <strong>Address: </strong> {cart.shippingAddress.address},
                                        {cart.shippingAddress.city},{' '}
                                        {cart.shippingAddress.postalCode},
                                        {cart.shippingAddress.country}
                                    </p>
                                }
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method:</strong> {order.paymentMethod}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Order Items</h2>
                                <ul>
                                    {order.orderItems.map((item) => (
                                        <li key={item.product}>
                                            <div className="row">
                                                <div>
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="small"
                                                    ></img>
                                                </div>
                                                <div className="min-30">
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </div>

                                                <div>
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>Order Summary</h2>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Items</div>
                                    <div>${order.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Tax</div>
                                    <div>${order.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>
                                        <strong> Order Total</strong>
                                    </div>
                                    <div>
                                        <strong>${order.itemsPrice.toFixed(2)}</strong>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderPage;