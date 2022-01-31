import React, {useState} from "react";
import "./Checkout.css";
import Subtotal from "../Subtotal/Subtotal";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
import { useStateValue } from "../../StateProvider";
import ReactPaginate from "react-paginate";
function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [pageNumber, setPageNumber] = useState(0);

  const productsPerPage = 2;
  const pagesVisited = pageNumber * productsPerPage;

  const displayProducts = basket
    .slice(pagesVisited, pagesVisited + productsPerPage)
    .map((item) => (
      <CheckoutProduct
        key={item.id + Math.floor(Math.random() * 50)}
        id={item.id}
        title={item.title}
        image={item.image}
        price={item.price}
        rating={item.rating}
      />
    ));
  const pageCount = Math.ceil(basket.length / productsPerPage);
  const changePage = ({selected})=>{
    setPageNumber(selected);
  }
  return (
    <div className="checkout">
      {basket.length == 0 ? (
        <div className="bg-[#EAEDED]">
          <h1 className="text-[75px] flex justify-center m-64 ">
            your cart is empty
          </h1>
        </div>
      ) : (
        <>
          <div className="checkout__left">
            <h2 className="checkout__title">Your Shopping Basket</h2>
            {displayProducts}
            <ReactPaginate 
            previousLabel={'Previous'}
            nextLabel={'Next'}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName="paginitionBtns"
            previousLinkClassName="previousBtns"
            nextLinkClassName="nextBtns"
            disabledLinkClassName="paginationDisabled"
            activeClassName="paginationActive"
            />
          </div>

          <div className="checkout__right">
            <Subtotal />
          </div>
        </>
      )}
    </div>
  );
}

export default Checkout;
