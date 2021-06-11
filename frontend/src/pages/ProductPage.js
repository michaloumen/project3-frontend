import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ApiService from '../services/api.services';
import { detailsProduct } from '../actions/productActions';
import { addToCart } from '../actions/cartActions';

function ProductPage(props) {
    /* console.log(props) */
    const [qty, setQty] = useState(1);

    const [products, setProduct] = useState([]);

    const productDetails = useSelector(state => state.productDetails);
    const { product, loading, error } = productDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id));
    }, []);

    //fiz com o Henrique
    const handleAddToCart = () => {
        dispatch(addToCart(props.match.params.id, Number(qty)));


        /*         const location = window.location.pathname.split("/product/");
                const productsFiltered = products.filter(product =>
                    product._id === location[location.length - 1])
        
                props.setCart([{
                    name: productsFiltered[0].name,
                    price: productsFiltered[0].price,
                    quantity: qty
                }]) */

        props.history.push("/cart/" + props.match.params.id + "?qty" + qty)
    }

    //filter
    return <div className="product">
        <div className="back-to-result">
            <Link to="/">Voltar para resultados</Link>
        </div>
        {loading ? <div>Carregando...</div> :
            error ? <div>{error}</div> :
                (
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
                                    Preço: <b>R$ {product.price}</b>
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
                    </div >
                )

        }

    </div>
}

export default ProductPage;