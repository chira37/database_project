import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/CartItems.css';
import {Row, Col, Container, Button} from "react-bootstrap";
import { ReactComponent as BackToCart } from '../files/arrow-alt-circle-left-solid.svg';
import CartContextProvider from '../Context/CartContext';

import CartTable from './CartTable';
import PaymentCard from './PaymentCard';

function CartItems(props){
    return(
        <>
            {/* if statement */}
            {/* {props.cartItems.length === 0 ? <div>

                <div className="no-item text-center">No Items To Display</div>

            </div> : <div> */}

                <div className="text-center cart-title add-curser">Shopping Cart</div>
                <CartContextProvider>
                    <CartTable cartItems={props.cartItems} handleAddProduct={props.handleAddProduct}/>
                </CartContextProvider>

                <Container className="cartDetail-container">
                    <Row className="">
                        <Col className="cartDetail-column d-flex flex-column mt-auto">
                            <Button href="products" className="d-block login-submit-btn login-input btn-continue" type="submit" >
                                <BackToCart className="sign-out-btn align-content-center" height="15px"/>Continue Shopping
                            </Button>
                        </Col>
                        <Col className="cartDetail-column"></Col>
                        <Col className="cartDetail-column cartDetail-column-3 d-flex flex-column align-items-end align-self-end">
                            <div className="cartDetail-column-2 mt-2 add-curser">Sub Total</div>
                            <div className="cartDetail-column-2 add-curser">Discount</div>
                            <div className="cartDetail-column-2 mb-0 add-curser">Total</div>
                        </Col>
                        <Col className="cartDetail-column"></Col>
                    </Row>
                </Container>

            {/* </div> } */}
            {/* end of if statement */}

            <div className="text-center cart-title add-curser">Payment Informartion</div>

            <PaymentCard />
        </>
    );
}

export default CartItems;