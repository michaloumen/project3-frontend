import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { useHistory } from "react-router-dom";

function PlaceOrderPage(props) {
    let history = useHistory();
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const { cartItems, shipping, payment } = cart;
    if (!shipping.address) {
        history.push("/shipping");
    } else if (!payment.paymentMethod) {
        history.push("/payment");
    }
    /*     if (!payment) {
            history.push("/payment")
        } */

    /*     useEffect(() => {
            //
        }, []) */

    const checkoutHandler = () => {
        props.history.push("/signun?redirect=shipping");
    }

    return <div>
        <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
        <div className="placeorder">
            <div className="placeorder-info">
                <div>
                    <h3>Envio</h3>
                </div>
                <div>
                    {cart.shipping.address}, {cart.shipping.city}, {cart.shipping.postalCode}
                </div>
                <div>
                    <h3>Pagamento</h3>
                    <div>
                        Método de pagamento: {cart.payment.paymentMethod}
                    </div>
                </div>
                <div>
                    <ul className="cart-list-container">
                        <li>
                            <h3>
                                Carrinho de Compras
                            </h3>
                            <div>
                                Preço
                            </div>
                        </li>
                        {
                            cartItems.length === 0 ?
                                <div>
                                    O carrinho está vazio
                                </div>
                                :
                                cartItems.map(item =>
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
                                            <div>
                                                Quantidade: {item.qty}
                                            </div>
                                        </div>
                                        <div className="cart-price">
                                            R$ {item.price}
                                        </div>
                                    </li>
                                )
                        }
                    </ul>
                </div>

            </div>
            <div className="placeorder-action">
                <h3>
                    Subtotal ( {cartItems.reduce((a, c) => a + Number(c.qty), 0)} items)
                    :
                    $ {cartItems.reduce((a, c) => a + (Number(c.price) * Number(c.qty)), 0)}
                </h3>
                <button onClick={checkoutHandler} className="button primary full-width" disabled={cartItems.length === 0}>
                    Prossiga para pagamento
                </button>
            </div>
        </div>
    </div>
}

export default PlaceOrderPage;