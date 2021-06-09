import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';

function HomePage(props) {
  /* HOOK */
  const productList = useSelector(state => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  /*   const getProducts = async () => {
      try {
        const products = await ApiService.getProducts();
  
        setProduct(products);
      } catch (error) {
        console.log(error);
      }
    }; */

  useEffect(() => {
    dispatch(listProducts());
    return () => {
      //
    };
  }, []);

  return (
    <>
      {
        loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <ul className="products">
            {products && products.map((product) => (
              <li key={product._id}>
                <div className="product">
                  <Link to={'/product/' + product._id}>
                    <img
                      className="product-image"
                      src={product.image}
                      alt="product"
                    />
                  </Link>
                  <div className="product-name">
                    <Link to={'/product/' + product._id}>{product.name}</Link>
                  </div>
                  <div className="product-brand">{product.brand}</div>
                  <div className="product-price">${product.price}</div>
                </div>
              </li>
            ))}
          </ul>
        )
      }
    </>
  );
}
export default HomePage;