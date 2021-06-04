import React, { useState, useEffect } from 'react';
import ProductCart from '../components/ProductCart';
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

  return <ul className="product">
    <div className="products">
      {products.map((product) => (
        <li><ProductCart key={product._id} product={product} /></li>
      ))}
    </div>
  </ul>
}

export default HomePage;