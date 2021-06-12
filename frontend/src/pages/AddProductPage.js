import React, { useEffect, useState } from 'react';
/* import { Link } from 'react-router-dom'; */
import { useSelector, useDispatch } from 'react-redux';
import { listProducts, saveProduct } from '../actions/productActions';

function AddProductPage(props) {

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [brand, setBrand] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');
    const productList = useSelector(state => state.productList);
    const { loading, products, error } = productList;
    const productSave = useSelector(state => state.productSave);
    const { loading: loadingSave, success: successSave, error: errorSave } = productSave;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts());

    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveProduct({ name, category, image, price, brand, countInStock, description }));
    }

    return <div className="content content-margined">

        <div className="product-header">
            <h3>Produtos</h3>
            <button>Criar Produto</button>
        </div>

        <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <h2>Criar Produto</h2>
                    </li>
                    <li>
                        {loadingSave && <div>Carregando...</div>}
                        {errorSave && <div>{errorSave}</div>}
                    </li>
                    <li>
                        <label htmlFor="name">
                            Nome
                        </label>
                        <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="category">
                            Categoria
                        </label>
                        <input type="text" name="category" id="category" onChange={(e) => setCategory(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="image">
                            Imagem
                        </label>
                        <input type="text" name="image" id="image" onChange={(e) => setImage(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="price">
                            Preço
                        </label>
                        <input type="text" name="price" id="price" onChange={(e) => setPrice(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="brand">
                            Marca
                        </label>
                        <input type="text" name="brand" id="brand" onChange={(e) => setBrand(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="countInStock">
                            Quantidade em estoque
                        </label>
                        <input type="text" name="countInStock" id="countInStock" onChange={(e) => setCountInStock(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="description">
                            Descrição
                        </label>
                        <textarea type="text" name="description" id="description" onChange={(e) => setDescription(e.target.value)} />
                    </li>
                    <li>
                        <button type="submit" className="button primary">Criar</button>
                    </li>
                </ul>
            </form>
        </div>

        <div className="product-list">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Categoria</th>
                        <th>Marca</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (<tr>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.brand}</td>
                        <td>
                            <button>Editar</button>
                            <button>Apagar</button>
                        </td>
                    </tr>))}
                </tbody>
            </table>
        </div>
    </div>
}





export default AddProductPage;