import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { saveShipping } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

function ShippingPage(props) {

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShipping({ address, city, postalCode }));
        props.history.push('payment');
    }

    return <div>
        <CheckoutSteps step1 step2></CheckoutSteps>
        <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <h2>Endereço</h2>
                    </li>
                    <li>
                        <label htmlFor="address">
                            Rua
                        </label>
                        <input type="text" name="address" id="address" onChange={(e) => setAddress(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="city">
                            Cidade
                        </label>
                        <input type="text" name="city" id="city" onChange={(e) => setCity(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="postalCode">
                            CEP
                        </label>
                        <input type="text" name="postalCode" id="postalCode" onChange={(e) => setPostalCode(e.target.value)} />
                    </li>
                    <li>
                        <button type="submit" className="button primary">Continuar</button>
                    </li>
                </ul>
            </form>
        </div>
    </div>

}

export default ShippingPage;