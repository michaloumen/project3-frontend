import React, { useEffect, useState } from 'react';
/* import { Link } from 'react-router-dom'; */
import { useSelector, useDispatch } from 'react-redux';
import { listProducts, saveProduct, deleteProduct } from '../actions/productActions';

function AddProductPage(props) {

    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState('');
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

    const productDelete = useSelector(state => state.productDelete);
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;
    const dispatch = useDispatch();

    useEffect(() => {
        if (successSave) {
            setModalVisible(false);
        }
        dispatch(listProducts());

    }, [successSave, successDelete]);

    const openModal = (product) => {
        setModalVisible(true);
        setId(product._id);
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCountInStock(product.countInStock);
        setCategory(product.category);
        setDescription(product.description);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveProduct({
            _id: id,
            name,
            category,
            image,
            price,
            brand,
            countInStock,
            description
        }));
    }

    const deleteHandler = (product) => {
        dispatch(deleteProduct(product._id));
    }

    return <div className="content content-margined">

        <div className="product-header">
            <h3>Produtos</h3>
            <button className="button primary" onClick={() => openModal({})}>Criar Produto</button>
        </div>

        {modalVisible &&
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
                            <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="category">
                                Categoria
                            </label>
                            <input type="text" name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="image">
                                Imagem
                            </label>
                            <input type="text" name="image" id="image" value={image} onChange={(e) => setImage(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="price">
                                Preço
                            </label>
                            <input type="text" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="brand">
                                Marca
                            </label>
                            <input type="text" name="brand" id="brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="countInStock">
                                Quantidade em estoque
                            </label>
                            <input type="text" name="countInStock" id="countInStock" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="description">
                                Descrição
                            </label>
                            <textarea type="text" name="description" value={description} id="description" onChange={(e) => setDescription(e.target.value)} />
                        </li>
                        <li>
                            <button type="submit" className="button primary">{id ? "Atualizar" : "Criar"}</button>
                        </li>
                        <li>
                            <button type="button" onClick={() => setModalVisible(false)} className="button secondary">Cancelar</button>
                        </li>
                    </ul>
                </form>
            </div>
        }

        <div className="product-list">
            <table className="table">
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
                    {products.map(product => (<tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.brand}</td>
                        <td>
                            <button className="button" onClick={() => openModal(product)}>Editar</button>
                            {' '} {/* espaço */}
                            <button className="button" onClick={() => deleteHandler(product)}>Apagar</button>
                        </td>
                    </tr>))}
                </tbody>
            </table>
        </div>
    </div>
}





export default AddProductPage;