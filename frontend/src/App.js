import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import Nav from "./components/Nav";

function App() {
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
                        <Route path="/product/:id" component={ProductPage} />
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
