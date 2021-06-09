import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ApiService from '../services/api.services';

function ProductPage(props) {
    console.log(props)
    const [qty, setQty] = useState(1);

    const [products, setProduct] = useState([]);

    const getProducts = async () => {
        try {
            const products = await ApiService.getProducts();

            setProduct(products);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    const handleAddToCart = () => {
        /*  props.history.push("/cart/" + props.match.params.id + "?qty" + qty) //vai levar para uma página de carrinho com a quantidade de items escolhido  */
        const productsFiltered = products.filter(product =>
            product._id === location[location.length - 1])

        props.setCart([{
            name: productsFiltered[0].name,
            price: productsFiltered[0].price,
            quantity: qty
        }])
    }

    const location = window.location.pathname.split("/product/");
    const productsFiltered = products.filter(product =>
        product._id === location[location.length - 1])
    //filter
    return <div className="product">
        {productsFiltered.map(product =>
            <>
                <div className="back-to-result">
                    <Link to="/">Voltar para resultados</Link>
                </div>
                <div className="details">

                    <div className="details-image">
                        <img src={product.image} alt="product"></img>
                    </div>
                    <div className="details-info">
                        <ul>
                            <li>
                                <h4>{product.name}</h4>
                            </li>
                            <li>
                                <b>Preço: R$ {product.price}</b>
                            </li>
                            <li>
                                Descrição:
                        <div>
                                    {product.description}
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="details-action">
                        <ul>
                            <li>
                                Preço: R$ {product.price}
                            </li>
                            <li>
                                Status: {product.countInStock > 0 ? "Em estoque" : "Indisponível"}
                            </li>
                            <li>
                                Quantidade: <select value={qty} onChange={(e) => { setQty(e.target.value) }}>
                                    {[...Array(product.countInStock).keys()].map(x =>
                                        <option key={x + 1} value={x + 1}>{x + 1}</option> //pra deixar dinâmico a quantidade que tem em estoque
                                    )}
                                </select>
                            </li>
                            <li>
                                {product.countInStock > 0 && <button onClick={handleAddToCart} className="button">Adicionar ao carrinho</button>} {/* se tiver indisponível, esconder */}

                            </li>
                        </ul>
                    </div>
                </div></>)
        }

    </div >
}

export default ProductPage;