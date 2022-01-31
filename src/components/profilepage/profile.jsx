import React, { useState, useEffect } from "react";
import "../profilepage/profile.css";
import { useStateValue } from "../../StateProvider";
import Weather from "../Weather/Weather";
import { db } from "../Firebase/firebase";
function Profile() {
  const [{ user }] = useStateValue();
  const [orders, setOrders] = useState([]);
  const [orderNumber, setOrderNumber] = useState([]);
  const [change, setChange] = useState('change');
  
  let products = [];
  let orderNum=[];
  const returnh1 = (x,index) => {
    
    const prod = x.products.map((element,i) => {
      return (
        <div className="order-detaile" key={i+12000}>
          <img src={element.image} className="order-img" />
          <div className="product-name">
            <span>
              <strong> product name: </strong>
              {element.title}
            </span>
            <span className="product-price">price: ${element.price}</span>
            <span className="product-decs">Status {x.status}</span>
          </div>

          
        </div>
      );
    });
    return (
      <section className="order-card ">
        <div className="card-header ">
          <div className="p-4">
          <div>Order Placed</div>
          <div>22/2/2022</div>
          </div>
          <div className="order-method">
                <h1>Pre-order</h1>
                <h3>
                  order within : <strong>5days</strong>{" "}
                </h3>
              </div>
          </div>
          <div className="card-body">
            <div className="order-details p-8">
              {prod}
              <button id={orderNumber[index]} onClick={()=>{cancelOrder(orderNumber[index])}} className="cansel-order">Cancel Order</button>
            </div>
          </div>
        
      </section>
    );
  };
const cancelOrder=(x)=>{
  db.collection("orders").doc(x).delete().then(() => {
    console.log("Document successfully deleted!");
    setChange('change me')
    changeColor(x)
}).catch((error) => {
    console.error("Error removing document: ", error);
});
console.log('i am here');
}

function changeColor(x){
  document.getElementById(x).textContent="deleted";
  document.getElementById(x).style.color="red";
}
  useEffect(() => {
    (!sessionStorage.getItem('email'))?sessionStorage.setItem('email',user?.email):sessionStorage.getItem('email')
    db.collection("orders")
      .where("user_email", "==", sessionStorage.getItem('email'))
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          products.push(doc.data());
          orderNum.push(doc.id);
          
        });

        setOrders(products);
        setOrderNumber(orderNum)
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, []);
  return (
    <div>
      <section className="profile_section">
        <div className="right flex-row ">
          <h2 className="profile_h2">Your Order's</h2>

          {orders.map((ele,inde) => {
            return returnh1(ele,inde);
          })}
        </div>
        <div className="left">
          <h2 className="profile_h2" style={{ textAlign: "center" }}>
            User Profile
          </h2>

          <div className="card">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
              alt="John"
              style={{ width: "50%" }}
            />
            <h1>{user?.email}</h1>
            <p className="title">{user?.phone}</p>
            <p>Harvard University</p>
            <div style={{ margin: '24px 0' }}></div>
            {/* <p>
              <button className="change_info">Contact</button>
            </p> */}
          </div>
          <div className="card">
        <Weather />
        </div>
        </div>
        
        
      </section>
    </div>
  );
}
export default Profile;