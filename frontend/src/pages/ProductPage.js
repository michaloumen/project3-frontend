import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ProductPage(props) {

    const [products, setProduct] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get("http://localhost:5000/api/products");
            setProduct(data);
        }
        fetchData();
    }, [])

    const location = window.location.pathname.split("/product/");
    const productsFiltered = products.filter(product =>
        product._id == location[location.length - 1])
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
                                Status: {product.status}
                            </li>
                            <li>
                                Quantidade: <select>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                </select>
                            </li>
                            <li>
                                <button className="button">Adicionar ao carrinho</button>
                            </li>
                        </ul>
                    </div>
                </div></>)
        }

    </div >
}

export default ProductPage;