import React from 'react';
import data from './data';
import './App.css';

function App() {
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open")
  }
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open")
  }
  return (

    <div className="grid-container">
        <header className="header">
            <div className="brand">
                <button onClick={openMenu}>
                    &#9776;
                </button>
                <a href="index.html">Dental</a>
            </div>
            <div className="header-links">
                <a href="cart.html">Carrinho</a>
                <a href="signin.html">Cadastrar</a>
            </div>
        </header>
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
                <ul className="products">
                  {
                    data.products.map(product => 
                    <li>
                      <div className="product">
                          <img className="product-image" src={product.image} alt="Jogo Clínico"></img>
                          <div className="product-name">
                            <a href="product.html">{product.name}</a>
                          </div>
                        <div className="product-brand">{product.brand}</div>
                        <div className="product-price">R$ {product.price}</div>
                        </div>
                    </li>)
                  }
                </ul>
            </div>
        </main>
        <footer className="footer">
            All right reserved.
        </footer>
    </div>
  );
}

export default App;
