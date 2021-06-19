import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { useHistory } from "react-router-dom";

function PaymentPage(props) {
    let history = useHistory();

    const [paymentMethod, setPaymentMethod] = useState('Paypal');
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history.push('/placeorder');
    };

    return (
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <form className="formSignin" onSubmit={submitHandler}>
                <div>
                    <h1>Método de Pagamento</h1>
                </div>
                <div>
                    <input
                        type="radio"
                        id="paypal"
                        value="Paypal"
                        name="paymentMethod"
                        required
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    ></input>
                    <label htmlFor="paypal">Paypal</label>
                </div>
                <button className="button pŕimary buttonPayment" type="submit">Continuar</button>
            </form>
        </div>
    )
}

export default PaymentPage;