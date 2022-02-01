import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Checkout from "./components/Checkout/Checkout";
import Item from "./components/Item/Item";
import Login from "./components/Login/Login";
import { auth } from "firebase";
import Footer from "./components/footer/footer";
import Profile from "./components/profilepage/profile";
import Signup from "./components/signup/signup";
import { useStateValue } from "./StateProvider";
import Payment from "./components/Payment/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Products from "./components/Products/Products";
import NoMatch from "./components/NoMatch";

const promise = loadStripe("pk_test_XFy4Y8Pm6x2kEnAlJNd54d99");

function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          
          <Route path="/products" element={<Products />}></Route>
          <Route path="/item/:category/:itemId" element={<Item />}></Route>
          <Route
            path="/payment"
            element={
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            }
          ></Route>
          <Route path="*" element={<NoMatch />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
