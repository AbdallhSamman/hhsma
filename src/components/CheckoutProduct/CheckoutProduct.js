import React from "react";
import "./CheckoutProduct.css";
import StarIcon from "@mui/icons-material/Star";
import { useStateValue } from "../../StateProvider";

function CheckoutProduct({ id, title, image, price, rating }) {
  console.log = function(){};
    const [{ basket }, dispatch] = useStateValue();
    const removeFromBasket = ()=>{
         dispatch({
             type:"REMOVE_FROM_BASKET",
             id:id,
         })
    }

  return (
    <div className="checkoutProduct">
      <img
        className="checkoutProduct__image"
        src={image}
        alt="checkout product"
      />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <strong>{price}</strong>
          <small>JOD</small>

        </p>
        <p className="checkoutProduct__rating">
          {Array(rating)
            .fill()
            .map(() => (
              <StarIcon key={id+Math.floor(Math.random()*50)} className="product__rating--Star" />
            ))}
        </p>
      <button onClick={removeFromBasket}>Remove from basket</button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
