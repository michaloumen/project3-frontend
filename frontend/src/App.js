import React, { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import Nav from "./components/Nav";
import CartPage from './pages/CartPage';

function App() {
    const [cart, setCart] = useState([]);
    //setCart atualiza o carrinho
    console.log(cart)

    const closeMenu = () => {
        document.querySelector(".sidebar").classList.remove("open")
    }
    return (
        <BrowserRouter>
            <div className="grid-container">
                <Nav />
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
