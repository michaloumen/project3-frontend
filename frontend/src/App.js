import React, { useState } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import SigninPage from './pages/SigninPage';
import RegisterPage from './pages/RegisterPage';
import AddProductPage from './pages/AddProductPage';

function App() {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const [cart, setCart] = useState([]);
    //setCart atualiza o carrinho
    console.log(cart)

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
                    <a href="cart.html">Carrinho</a>
                    {
                        userInfo ? <Link to="/products">Bem vind@, {userInfo.name}</Link> :
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
