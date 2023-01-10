import { useContext } from 'react';
import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';
import CartContext from '../../../store/cart-context';
const MealItem = (props) => {

    const crtCtx = useContext(CartContext);

    const price = `$${props.price.toFixed(2)}`;

    const addToCartHandler = amount => {
        crtCtx.addItem({
            id:props.id,
            name:props.name,
            amount: amount,
            price: props.price
        });
    };

    return (
    <li className={classes.meal}>
        <div>
            <h3>{props.name}</h3>
            <h3 className={classes.description}>{props.description}</h3>
            <h3 className={classes.price}>{price}</h3>
        </div>
        <div>
            <MealItemForm onAddToCart={addToCartHandler}></MealItemForm>
        </div>
    </li>
    )
};

export default MealItem;
