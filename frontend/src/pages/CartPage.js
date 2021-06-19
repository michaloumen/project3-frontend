import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { useHistory } from "react-router-dom";

function CartPage(props) {
    let history = useHistory();
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    console.log(cartItems)

    /*     const productId = props.match.params.id;
        const qty = 1; */
    const dispatch = useDispatch();
    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    }

    /*     useEffect(() => {
            if (productId) {
                console.log(qty)
                dispatch(addToCart(productId, qty));
            }
        }, []) */

    const checkoutHandler = () => {
        history.push("/shipping"); /* eu mudei isso aqui */
    }

    return <div className="cart">
        <div className="cart-list">
            <ul className="cart-list-container">
                <li>
                    <h3>
                        Carrinho de Compras
                    </h3>
                    <h3>
                        Preço
                    </h3>
                </li>
                {
                    cartItems.length === 0 ?
                        <div>
                            O carrinho está vazio
                        </div>
                        :
                        cartItems.map(item =>
                            <li keu={item.product}>
                                <div className="cart-image">
                                    <img src={item.image} alt="product" />
                                </div>
                                <div className="cart-name">
                                    <div>
                                        <Link to={`/product/${item.product}`}>
                                            {item.name}
                                        </Link>

                                    </div>
                                    <div>
                                        Quantidade:
                                        <select value={item.qty}
                                            onChange={(e) => dispatch(
                                                addToCart(item.product, Number(e.target.value))
                                            )
                                            }>
                                            {[...Array(item.countInStock).keys()].map(x =>
                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                            )}
                                        </select>
                                        <button type="button" className="button delete-button" onClick={() => removeFromCartHandler(item.product)}>
                                            Apagar
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
                <button onClick={checkoutHandler} className="button primary full-width" disabled={cartItems.length === 0}>
                    Prossiga para pagamento
                </button>
            </h3>
        </div>
    </div>
}

export default withRouter(CartPage);