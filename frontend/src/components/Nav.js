import { Link } from 'react-router-dom';

const Nav = () => {
    const openMenu = () => {
        document.querySelector(".sidebar").classList.add("open")
    }
    return (
        <header className="header">
            <div className="brand">
                <button onClick={openMenu}>
                    &#9776;
                </button>
                <Link to="/">Dental</Link>
            </div>
            <div className="header-links">
                <a href="cart.html">Carrinho</a>
                <a href="signin.html">Cadastrar</a>
            </div>
        </header>
    )
}

export default Nav;
