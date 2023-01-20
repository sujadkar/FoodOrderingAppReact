import React, { useContext,useState } from 'react';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';
import axios from "axios";

const baseURL = "https://react-http-87a7d-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json";

const Cart = (props) => {
    const [isCheckout,setIsCheckout] = useState(false);
    const [isSubmitted,setIsSubmitted] = useState(false);
    const [didSubmit,setDidSubmit] = useState(false);
    const cartCtx =  useContext(CartContext);

    const totalAmount = cartCtx.totalAmount.toFixed(2);
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = item => {
        cartCtx.addItem({...item,amount:1});
    };

    const cartitems = <ul className={classes['cart-items']}>
        {cartCtx.items.map(
        (item) => <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} 
        onRemove={cartItemRemoveHandler.bind(null,item.id)}
        onAdd={cartItemAddHandler.bind(null,item)}></CartItem>
    )}</ul>;

    const orderHandler = (event) =>{
        setIsCheckout(true);
    }        

    const submitOrderHandler = (userData) => {
        setIsSubmitted(true);
        axios.post(baseURL, {
        user:userData,
        orderedItems : cartCtx.items
      })
      .then((response) => {
        //setPost(response.data);
        setIsSubmitted(false);
        setDidSubmit(true);
        cartCtx.clearCart();
      });
    };

    const isSubmittingModalContent = <p>Sending order data...</p>
    const didSubmitModalContent = 
    <React.Fragment>
        <p>Successfully sent order!</p>
        <div className={classes.actions}>
        <button className={classes['button']} onClick={props.onClose}>Close</button>
        </div>
    </React.Fragment>

   
    const modalActions = <div className={classes.actions}>
    <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
    { hasItems && <button onClick={orderHandler} className={classes.button}>Order</button> }
    </div>;
   
   
   const cartModelContent = 
   <React.Fragment>
       {cartitems}
           <div className={classes.total}>
               <span>Total Amount</span>
               <span>${totalAmount}</span>
           </div>
           { isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose}></Checkout>}
           { !isCheckout && modalActions}
   </React.Fragment>

   
   
   return (
        <Modal onClose={props.onClose}>
            {!isSubmitted && !didSubmit && cartModelContent}
            {isSubmitted && isSubmittingModalContent}
            {!isSubmitted && didSubmit && didSubmitModalContent}
        </Modal>
    );
};

export default Cart;