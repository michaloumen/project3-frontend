import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

function HomePage (props) {
/* HOOK */
    const [products, setProduct] = useState([]);

/*     useEffect(() => {
        const fetchData = async () => {
            const {data} = await axios.get("http://localhost:5000/api/products");
            setProduct(data);
        }
        fetchData();
    }, [])
 */

    const getProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProduct(response.data);
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