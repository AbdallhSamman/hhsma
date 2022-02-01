import React, { useState } from 'react'
import './Payment.css'
import { useStateValue } from '../../StateProvider'
import CheckoutProduct from '../CheckoutProduct/CheckoutProduct'
import { Link, useNavigate } from 'react-router-dom'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import CurrencyFormat from 'react-currency-format'
import { getBasketTotal } from '../../reducer'
import { useEffect } from 'react/cjs/react.development'
import { auth, db } from '../Firebase/firebase'
import axios from 'axios'

const Payment = () => {
  const [{ basket, user }, dispatch] = useStateValue()
  const stripe = useStripe()
  const [reqErr, setreqErr] = useState('')
  const elements = useElements()
  const navigat = useNavigate()
  const [error, setError] = useState(null)
  const [disabled, setDisabled] = useState(true)
  const [fullName, setFullName] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [zip, setZip] = useState('')
  const [phone, setPhone] = useState('')
  const [building, setBuilding] = useState('')
  const [succeeded, setSucceeded] = useState(false)
  const [processing, setProcessing] = useState('')
  const [clientSecret, setClientSecret] = useState(true)
  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: 'post',
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      })
      setClientSecret(response.data.clientSecret)
    }
    getClientSecret()
  }, [basket])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (auth.currentUser != null) {
        saveAddress()
        saveOrder()
    } else navigat('/login')
  }
  const handelAddress = (e) => {
    e.preventDefault()

    if (fullName || city || zip || street || phone || building === '') {
      setreqErr('all Field is Required')
      return false
    } else {
      setreqErr('')
      return true
    }
  }

  const handleChange = (e) => {
    setDisabled(e.empty)
    setError(e.error ? e.error.message : '')
  }
  const saveOrder = () => {
    db.collection('orders')
      .doc('order - ' + Math.floor(Math.random() * 500))
      .set({
        user_email: user.email,
        status: 'completed',
        products: [...basket],
      })

    navigat('/profile')
  }
  
  const saveAddress = () => {
    let form = document.getElementById('addressForm');
    let name = document.getElementById('fullname').value;
    let address = document.getElementById('streetAddress').value;
    let number = document.getElementById('phoneNumber').value;
    let building = document.getElementById('building').value;
    let city = document.getElementById('city').value;
    db.collection('users')
      .doc(user.email)
      .set({
        fullName:name,
        building:building,
        phoneNumber:number,
        city:city,
        address:address

      })
    }
  return (
    <div className="payment">
      {basket.length == 0 ? (
        <div className="bg-[#EAEDED]">
          <h1 className="text-[75px] flex justify-center m-64 ">
            your cart is empty
          </h1>
        </div>
      ) : (
        <div className="payment__container">
          <div className="payment__right pb-8">
            <div className="payment__title flex justify-center mb-8 font-bold text-[40px]">
              <h3>Review item and delivery</h3>
            </div>
            <section className="payment__section1">
              <div className="address__left">
                <form id="addressForm" >
                  <h1 className="text-center text-[25px] mb-8 font-bold">
                    Address Form
                  </h1>
                  <span className="text-center bg-[#F8D7DA] text-[#ff6347] font-bold rounded-lg mb-2">
                    {reqErr}
                  </span>
                  <h5>Full name (First and Last name)</h5>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    id="fullname"
                  />
                  <h5>Phone number</h5>
                  <input
                    id="phoneNumber"
                    type="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Must be a Number"
                  />
                  <h5>Address</h5>
                  <input
                    id="streetAddress"
                    placeholder="Street Address"
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                  <input
                    placeholder="Apt, unit, bulding, floor, etc"
                    type="text"
                    id="building"
                    value={building}
                    onChange={(e) => setBuilding(e.target.value)}
                  />
                  <h5>City</h5>
                  <input
                    id="city"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <h5>ZIP Code</h5>
                  <input
                    type="number"
                    id="zip"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    placeholder="Must be a Number"
                  />

                  <div className="payment__details">
                    <CardElement onChange={handleChange} />
                    <div className="payment__priceContainer">
                      <CurrencyFormat
                        renderText={(value) => <h3>Order Total:{value}</h3>}
                        decimalScale={2}
                        value={getBasketTotal(basket)}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'$'}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="login__signInButton"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Buy Now
                  </button>
                </form>
              </div>

              <div className="payment__items">
                <h1 className="text-center mb-5 font-bold text-[25px]">
                  Checkout (<Link to="/checkout">{basket?.length} items</Link>)
                </h1>
                {basket.map((item) => (
                  <CheckoutProduct
                    key={item.id + Math.floor(Math.random() * 50)}
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}
                  />
                ))}

               
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  )
}

export default Payment
