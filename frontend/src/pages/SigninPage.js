import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/userActions';

function SigninPage(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo, error } = userSignin;
    const dispatch = useDispatch();

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';
    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
    }, [userInfo]); //se mudar o userinfo, o if do useEffect vai acontecer

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));
    }

    return <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>Entrar</h2>
                </li>
                <li>
                    {loading && <div>Carregando...</div>}
                    {error && <div>{error}</div>}
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
                    <button type="submit" className="button primary">Entrar</button>
                </li>
                <li>
                    Nov@ na Dental?
                </li>
                <li>
                    <Link to={redirect === '/' ? 'register' : 'register?redirect=' + redirect} className="button secondary text-center">Crie sua conta</Link>
                </li>
            </ul>
        </form>
    </div>
}

export default SigninPage;