import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../actions/productActions';
import { addToCart } from '../actions/cartActions';
import { useHistory } from "react-router-dom";

function ProductPage(props) {
    let history = useHistory();

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

        history.push("/cart/" + props.match.params.id + "?qty" + qty)
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
                        <div>
                            <img className="details-image" src={product.image} alt="product"></img>
                        </div>
                        <div className="details-info">
                            <ul>
                                <li>
                                    <h4>{product.name}</h4>
                                </li>
                                <li>
                                    Pre??o: <b>R$ {product.price}</b>
                                </li>
                                <li>
                                    Descri????o:
                                    <div>
                                        {product.description}
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="details-action">
                            <ul>
                                <li>
                                    Pre??o: R$ {product.price}
                                </li>
                                <li>
                                    Status: {product.countInStock > 0 ? "Em estoque" : "Indispon??vel"}
                                </li>
                                <li>
                                    Quantidade: <select value={qty} onChange={(e) => { setQty(e.target.value) }}>
                                        {[...Array(product.countInStock).keys()].map(x =>
                                            <option key={x + 1} value={x + 1}>{x + 1}</option> //pra deixar din??mico a quantidade que tem em estoque
                                        )}
                                    </select>
                                </li>
                                <li>
                                    {product.countInStock > 0 && <button onClick={handleAddToCart} className="button">Adicionar ao carrinho</button>} {/* se tiver indispon??vel, esconder */}

                                </li>
                            </ul>
                        </div>
                    </div >
                )

        }

    </div>
}

export default ProductPage;