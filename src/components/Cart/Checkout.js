import classes from './Checkout.module.css';
import { useRef,useState } from 'react';

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length !== 5;

const Checkout = (props) => {

    const [formInputValidity,setFormInputValidity] = useState({
        name : true,
        street: true,
        city: true,
        postal : true
    });
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const name = nameInputRef.current.value;
    const steert = streetInputRef.current.value;
    const postal = postalInputRef.current.value;
    const city = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(name);
    const enteredSteerIsValid = !isEmpty(steert);
    const enteredPostalIsValid = !isFiveChars(postal);
    const enteredCityIsValid = !isEmpty(city);

    setFormInputValidity({
        name:enteredNameIsValid,
        city:enteredCityIsValid,
        street:enteredSteerIsValid,
        postal:enteredPostalIsValid
    });

    const formIsValid = enteredNameIsValid && enteredSteerIsValid && enteredPostalIsValid && enteredCityIsValid;

    if(!formIsValid){

        return;
    }

    props.onConfirm({
        name:name,
        city:city,
        street : steert,
        postalCode:postal
    });
  };

  const nameControlClasses = `${classes.control} ${formInputValidity.name ? '' : classes.invalid}`;  
  const cityControlClasses = `${classes.control} ${formInputValidity.city ? '' : classes.invalid}`;  
  const postalControlClasses = `${classes.control} ${formInputValidity.postal ? '' : classes.invalid}`;  
  const streetControlClasses = `${classes.control} ${formInputValidity.street ? '' : classes.invalid}`;  

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input ref={nameInputRef} type='text' id='name' />
        { !formInputValidity.name && <p>Please enter valid name</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input ref={streetInputRef} type='text' id='street' />
        { !formInputValidity.street && <p>Please enter valid street</p>}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input ref={postalInputRef} type='text' id='postal' />
        { !formInputValidity.postal && <p>Please enter valid postal</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input ref={cityInputRef} type='text' id='city' />
        { !formInputValidity.city && <p>Please enter valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
