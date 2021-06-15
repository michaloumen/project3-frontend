import React from 'react';

function CheckoutSteps(props) {
    return <div className="checkout-steps">
        <div className={props.step1 ? 'active' : ''}>Cadastro</div>
        <div className={props.step2 ? 'active' : ''}>Endereço</div>
        <div className={props.step3 ? 'active' : ''}>Pagamento</div>
        <div className={props.step4 ? 'active' : ''}>Encomenda</div>
    </div>
}

export default CheckoutSteps;