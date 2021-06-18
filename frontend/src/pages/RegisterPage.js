import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register, signin } from '../actions/userActions';

function RegisterPage(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const userRegister = useSelector(state => state.userRegister);
    const { loading, userInfo, error } = userRegister;
    const dispatch = useDispatch();

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';
    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
    }, [userInfo]); //se mudar o userinfo, o if do useEffect vai acontecer

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(register(name, email, password))
        dispatch(signin(email, password));
    }

    return <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>Cadastrar</h2>
                </li>
                <li>
                    {loading && <div>Carregando...</div>}
                    {error && <div>{error}</div>}
                </li>
                <li>
                    <label htmlFor="name">
                        Name
                    </label>
                    <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)} />
                </li>
                <li>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                </li>
                <li>
                    <label htmlFor="password">Senha</label>
                    <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                </li>
                <li>
                    <label htmlFor="rePassword">Confirme sua senha</label>
                    <input type="password" id="rePassword" name="rePassword" onChange={(e) => setRePassword(e.target.value)} />
                </li>
                <li>
                    <button type="submit" className="button primary">Registrar</button>
                </li>
                <li>
                    <Link to={redirect === '/' ? 'signin' : 'signin?redirect' + redirect}>Já tem uma conta?</Link>
                </li>
            </ul>
        </form>
    </div>
}

export default RegisterPage;