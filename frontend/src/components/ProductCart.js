import { Link } from 'react-router-dom';

const ProductCart = ({ product }) => {
    return <ul className="products">
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

    </ul>
}

export default ProductCart;
