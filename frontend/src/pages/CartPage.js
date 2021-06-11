import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { Link } from 'react-router-dom';

function CartPage(props) {
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    console.log(cartItems)

    const productId = props.match.params.id;
    const qty = 1;
    const dispatch = useDispatch();
    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));
    }

    /*     useEffect(() => {
            if (productId) {
                console.log(qty)
                dispatch(addToCart(productId, qty));
            }
        }, []) */

    const checkoutHandler = () => {
        props.history.push("/signun?redirect=shipping");
    }

    return <div className="cart">
        <div className="cart-list">
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
                                        Quantidade:
                                        <select value={item.qty} onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                                            {[...Array(item.countInStock).keys()].map(x =>
                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                            )}
                                        </select>
                                        <button type="button" className="button" onClick={() => removeFromCartHandler(item.product)}>
                                            Delete
                                        </button>
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
        <div className="cart-action">
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
}

export default CartPage;