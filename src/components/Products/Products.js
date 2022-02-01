import React, { useState, useEffect } from "react";
import Product from "../Product/Product";
import { db } from "../Firebase/firebase";
import "./products.css";
import Slider from "@mui/material/Slider";
import { StarIcon } from "@heroicons/react/solid";

const Products = () => {
  const [products, setProducts] = useState([]);

  const [filter_products, setProductsFilter] = useState([]);
  const [priceFilter, setPriceFilter] = useState(999);
  const [rateFilter, setRateFilter] = useState(5);
  const [search, setSearch] = useState("");
  let product = [];
  let categories=[]
  try{
	categories = JSON.parse(sessionStorage.getItem("category"));
  }catch(error){
	  console.log(error)
  }

  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  let searchBar = document.getElementById("search");
  let button = document.getElementById("searchButton");
  const returnProduct = (element) => {
    const prod = element.map((elemento, index) => {
      if (elemento.product_price <= priceFilter) {
        let proRate = elemento.product_rating / elemento.product_users_rating;
        if (proRate <= rateFilter) {
          if (
            elemento.product_name
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            elemento.product_description
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            elemento.product_category
              .toLowerCase()
              .includes(search.toLowerCase())
          ) {
            return (
              <Product
                key={elemento.product_id + 11000}
                id={elemento.product_id}
                title={elemento.product_name}
                price={elemento.product_price}
                description={elemento.product_description}
                category={elemento.product_category}
                image={elemento.product_images[0]}
                rating={Math.floor(
                  elemento.product_rating / elemento.product_users_rating
                )}
              />
            );
          }
        }
      }
    });
    return prod;
  };

  useEffect(() => {
    db.collection("categories")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((docs) => {
          product.push(docs.data().products);
        });

        button.addEventListener("click", (e) => {
          setSearch(searchBar.value);
        });

        setSearch(searchBar.value);
        setProducts(product);
        setProductsFilter(product);
      })
      .catch((error) => {
        
		setSearch("");
        setProducts(product);
        setProductsFilter(product);
      });
  }, []);

  return (
    <div className="grid-container">
      <div className="relative">
        <input className="m__hidden" type="checkbox" />
        <div className="m__hidden m__button">Filter</div>

        <div className="Filter">
          <div aria-label="Deals filters" className="gridFilterSection p-5">
            Filters :
            <span>
              <span aria-label="Price filter">
                <div className="gridFilterHeader p-4 font-bold  ">Category
				{categories?.map((ele)=>(
					  <div onClick={()=>{
						  searchBar.value=ele; setSearch(searchBar.value)}} className="CatsNames pl-7 font-normal">{ele.split('-')[0]}</div>
              ))}
              </div>
              
              </span>
            </span>
            <span>
              <span aria-label="Price filter">
                <div className="gridFilterHeader p-4 font-bold">Price
                <div >
                  <Slider
                    min={0}
                    max={80}
                    defaultValue={80}
                    onChange={(e) => {
                      setPriceFilter(e.target.value);
                    }}
                    aria-label="Default"
                    valueLabelDisplay="auto"
                  />
                </div>
                </div>
              </span>
            </span>
            <span data-testid="grid-filter-REVIEWS">
              <span aria-label="rating__filter">
                <div className="gridFilterHeader p-4 font-bold">Average Customer Review
                <div>
                  <div className="star-rating">
                    {[...Array(5)].map((star, index) => {
                      index += 1;
                      return (
                        <button
                          type="button"
                          key={index + 10000}
                          className={` h-5   w-5  text-yellow-500   ${
                            index <= (hover || rating) ? "on" : "off"
                          }`}
                          onClick={() => setRating(index)}
                          onMouseEnter={() => setHover(index)}
                          onMouseLeave={() => setHover(rating)}
                        >
                          <span className="star">
                            <StarIcon
                              className="h-5 w-5"
                              onClick={() => {
                                setRateFilter(index);
                              }}
                            />
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                </div>
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className="grid products grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-2 ">
        {filter_products.map((ele, index) => returnProduct(ele))}
      </div>
    </div>
  );
};

export default Products;
