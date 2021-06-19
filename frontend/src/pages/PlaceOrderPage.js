import React from 'react';
import CheckoutSteps from '../components/CheckoutSteps';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

function PlaceOrderPage() {
    let history = useHistory();
    const cart = useSelector(state => state.cart);

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Encomenda</h2>
                                <p>
                                    <strong>Name: </strong> {cart.shippingAddress.fullName} <br />
                                    <strong>Address: </strong> {cart.shippingAddress.address},
                                    {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Pagamento</h2>
                                <p>
                                    <strong>Method: </strong> {cart.paymentMethod}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Tipo de pagamento</h2>
                                <ul>
                                    {cart.cartItems.map(item =>
                                        <li>
                                            <div className="cart-image">
                                                <img src={item.image} alt="product" />
                                            </div>
                                            <div className="cart-name">
                                                <div>
                                                    <Link to={"/product/" + item.product}>
                                                        {item.name}
                                                    </Link>

                                                </div>
                                            </div>
                                            <div className="cart-price">
                                                {item.qty} x R$ {item.price} = ${item.qty * item.price}
                                            </div>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <ul>
                        <li>

                        </li>
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default PlaceOrderPage;