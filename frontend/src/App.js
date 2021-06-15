import React, { useState } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from './actions/userActions';
import './App.css';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import SigninPage from './pages/SigninPage';
import RegisterPage from './pages/RegisterPage';
import AddProductPage from './pages/AddProductPage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';

function App() {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const [cart, setCart] = useState([]); //setCart atualiza o carrinho
    /* console.log(cart) */
    const dispatch = useDispatch();
    const signoutHandler = () => {
        dispatch(signout());
    }

    const openMenu = () => {
        document.querySelector(".sidebar").classList.add("open")
    }
    const closeMenu = () => {
        document.querySelector(".sidebar").classList.remove("open")
    }
    return (
        <BrowserRouter>
            <header className="header">
                <div className="brand">
                    <button onClick={openMenu}>
                        &#9776;
                    </button>
                    <Link to="/">Dental</Link>
                </div>
                <div className="header-links">
                    <Link to="/cart/">Carrinho</Link>{/* tinha que ser cart/id? */}
                    {
                        userInfo ?
                            <div /* className="dropdown" */>
                                <Link to="/products">Bem vind@, {userInfo.name}
                                    <i className="fas fa-caret-down"></i>
                                </Link>
                                <ul /* className="dropdown-content" */>
                                    <Link to="#signout" onClick={signoutHandler}>Sair</Link>
                                </ul>
                            </div>
                            :
                            <Link to="/signin">Entrar</Link>
                    }
                </div>
            </header>
            <div className="grid-container">
                <aside className="sidebar">
                    <h3>Categorias</h3>
                    <button className="sidebar-close-button" onClick={closeMenu}>x</button>
                    <ul>
                        <li>
                            <a href="index.html">Biossegurança</a>
                        </li>
                        <li>
                            <a href="index.html">Clínica Geral</a>
                        </li>
                        <li>
                            <a href="index.html">Descartáveis</a>
                        </li>
                        <li>
                            <a href="index.html">Endodontia</a>
                        </li>
                        <li>
                            <a href="index.html">Prótese</a>
                        </li>
                    </ul>
                </aside>
                <main className="main">
                    <div className="content">
                        <Route path="/placeorder" component={PlaceOrderPage} />
                        <Route path="/payment" component={PaymentPage} />
                        <Route path="/shipping" component={ShippingPage} />
                        <Route path="/products" component={AddProductPage} />
                        <Route path="/register" component={RegisterPage} />
                        <Route path="/signin" component={SigninPage} />
                        <Route path="/product/:id" render={(props) => <ProductPage {...props} setCart={setCart} />} />
                        {/* props é todas as props que o component router passa pro componente de página */}
                        <Route path="/cart/:id?" component={CartPage} /> {/* ? porque o id é opcional */}
                        <Route path="/" exact={true} component={HomePage} />
                    </div>
                </main>
                <footer className="footer">
                    All right reserved.
                </footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
