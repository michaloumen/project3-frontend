import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShipping } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { useHistory } from "react-router-dom";

function ShippingPage(props) {
    let history = useHistory();
    const userInfo = useSelector(state => state.userSignin.userInfo);
    const [fullName, setFullName] = useState(userInfo.name);
    const [address, setAddress] = useState(userInfo.address);
    const [city, setCity] = useState(userInfo.city);
    const [postalCode, setPostalCode] = useState(userInfo.postalCode);
    const dispatch = useDispatch();

    console.log(userInfo)
    const submitHandler = (e) => {
        e.preventDefault(); //dispatch save shipping address action
        dispatch(saveShipping({ fullName, address, city, postalCode }));
        history.push('/payment');
    }

    return <div>
        <CheckoutSteps step1 step2></CheckoutSteps>
        <div className="formSignin">
            <form className="formSignin" onSubmit={submitHandler}>
                <div>
                    <h1>Endereço de Envio</h1>
                </div>
                <div>
                    <label htmlFor="fullName">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        placeholder="Ex: Maria da Silva"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="address">Endereço</label>
                    <input
                        type="text"
                        id="address"
                        placeholder="Ex: Rua Floriano Peixoto, 244"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="city">Cidade - Estado</label>
                    <input
                        type="text"
                        id="city"
                        placeholder="Ex: Curitiba - PR"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="postalCode">CEP</label>
                    <input
                        type="text"
                        id="postalCode"
                        placeholder="Ex: 86.400-000"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        required
                    ></input>
                </div>
                <div>
                    <label />
                    <button className="button primary" type="submit">Continue</button>
                </div>
            </form>
        </div>
    </div>

}

export default ShippingPage;