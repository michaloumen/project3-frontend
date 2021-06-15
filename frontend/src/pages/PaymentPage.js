import React, { useState, useSelector } from 'react';
import { useDispatch } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

function PaymentPage(props) {
    /*     const cart = useSelector(state => state.cart);
        const { shippingAddress } = cart;
        if (!shippingAddress) {
            props.history.push('/shipping');
        } */ //só vai ir pra pagamento se já tiver colocar o endereço mas não deu certo
    const [paymentMethod, setPaymentMethod] = useState('Paypal');
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push('placeorder');
    };

    return <div>
        <CheckoutSteps step1 step2 step3></CheckoutSteps>
        <div className="form">
            <ul className="form-container">
                <li>
                    <h2>Pagamento</h2>
                </li>
                <li>
                    <div>
                        <input
                            type="radio"
                            name="paymentMethod"
                            id="paypal"
                            value="Paypal"
                            onChange={(e) => setPaymentMethod(e.target.value)} />
                        <label htmlFor="paypal">Paypal</label>
                    </div>
                </li>
                <li>
                    <button type="submit" className="button primary" onClick={submitHandler}>Continuar</button>
                </li>
            </ul>
        </div>
    </div>
}

export default PaymentPage;