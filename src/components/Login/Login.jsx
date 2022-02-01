import React, { useState } from 'react'
import '../Login/login.css'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { auth } from '../Firebase/firebase'
function Login() {
 
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [erorr, setErorr] = useState('')
  const signIn = (e) => {
    e.preventDefault()
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
       
            navigate('/')
          
        }
      })
      .catch((error) => setErorr(error.message))
  }
  const register = (e) => {
    e.preventDefault()
    navigate('/signup')
  }

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
        />
      </Link>

      <div className="login__container">
        <h1>Sign-in</h1>
        <span className="errorMessage">{erorr}</span>
        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="login__signInButton"
            onClick={signIn}
          >
            Sign In
          </button>
        </form>

        <p>
        By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.
        </p>

       
        <div className="a-divider a-divider-break"><h5>New to Amazon?</h5></div>
        <button className="login__registerButton" onClick={register}>
          Create your Amazon Account
        </button>
      </div>
    </div>
  )
}

export default Login
