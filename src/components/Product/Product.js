import "./Product.css";
import { useStateValue } from "../../StateProvider";
import { StarIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
function Product({ id, title, image, price, rating, description, category }) {
  const [{ basket }, dispatch] = useStateValue();
  console.log = function(){};
  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
    localStorage.setItem("cart", JSON.stringify(basket));
  };
  return (
      <div className="relative flex flex-col m-1 bg-white z-30 p-5 rounded-sm product__border">
       <Link to={`/item/${category}/${id}`}>
        <p className="absolute top-2 right-3 text-xs text-gray-800">
          {category}
        </p>
        <img
          src={image}
          height="200"
          width="200"
          alt={title}
          style={{ objectFit: "contain", margin: "auto" , marginTop: "20px" }}
        />
        <h4 className="my-3 ">
          <p className="bold" >
            {title}
          </p>
        </h4>

        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon className="h-3 text-yellow-500"  key={i+9000}/>
            ))}
        </div>
        <div className="mb-5">
          <h1>{price} JOD </h1>
        </div>
        </Link>

        <button onClick={addToBasket} className="mt-auto button">
          Add to cart
        </button>
      </div>
  );
}

export default Product;
