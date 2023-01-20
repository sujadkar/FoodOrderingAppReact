import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect,useState } from 'react';
import axios from "axios";

const baseURL = "https://react-http-87a7d-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json";
// const DUMMY_MEALS = [
//   {
//     id: 'm1',
//     name: 'Sushi',
//     description: 'Finest fish and veggies',
//     price: 22.99,
//   },
//   {
//     id: 'm2',
//     name: 'Schnitzel',
//     description: 'A german specialty!',
//     price: 16.5,
//   },
//   {
//     id: 'm3',
//     name: 'Barbecue Burger',
//     description: 'American, raw, meaty',
//     price: 12.99,
//   },
//   {
//     id: 'm4',
//     name: 'Green Bowl',
//     description: 'Healthy...and green...',
//     price: 18.99,
//   },
// ];



const AvailableMeals = () => {

   const [meals,setMeals] = useState([]); 
  const [isLoading,setIsLoading] = useState(true);
  const [httpError,setHttpError] = useState(null);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      const response1 = response.data;
      const loadedMeals = [];

      for(const key in response1){
        loadedMeals.push({
          id:key,
          name:response1[key].name,
          description:response1[key].description,
          price:response1[key].price
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    }).catch(error => {
      setIsLoading(false);
      console.log(error.message);
      setHttpError(error.message);
    });
  },[]);
  


  if(isLoading){
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    )
  }

  
  if(httpError){
    return (
      <section className={classes.MealsError}>
        <p>Something went wrong</p>
        <p>{httpError}</p>
      </section>
    )
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
