import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ApiService from '../services/api.services';

function HomePage(props) {
  /* HOOK */
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

  return <ul className="products">
    {
      products.map(product =>
        <li>
          <div className="product">
            <Link to={'/product/' + product._id}>
              <img className="product-image" src={product.image} alt="product"></img>
            </Link>
            <div className="product-name">
              <Link to={'/product/' + product._id}>{product.name}</Link>
            </div>
            <div className="product-brand">{product.brand}</div>
            <div className="product-price">R$ {product.price}</div>
          </div>
        </li>)
    }
  </ul>
}

export default HomePage;