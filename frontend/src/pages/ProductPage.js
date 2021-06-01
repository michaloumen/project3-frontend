import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

function ProductPage(props) {

    const [products, setProduct] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const {data} = await axios.get("http://localhost:5000/api/products");
            setProduct(data);
        }
        fetchData();
    }, [])

    return <div>
        <div className="back-to-result">
            <Link to="/">Voltar para resultados</Link>
        </div>
        <div className="details">
            <div className="details-image">
                <img src={products.image} alt="product"></img>
            </div>
            <div className="details-info">
                <ul>
                    <li>
                        <h4>{products.name}</h4>
                    </li>
                    <li>
                        <b>Preço: R$ {products.price}</b>
                    </li>
                    <li>
                        Descrição: 
                        <div>
                            {products.description}
                        </div>
                    </li>
                </ul>
            </div>
            <div className="details-action">
                <ul>
                    <li>
                        Preço: R$ {products.price}
                    </li>
                    <li>
                        Status: {products.status}
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
        </div>
    </div>
}

export default ProductPage;