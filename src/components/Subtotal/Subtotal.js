import React from "react";
import "./Subtotal.css";
import { useNavigate  } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../../StateProvider";
import { getBasketTotal } from '../../reducer';

function Subtotal() {
  const navigate  = useNavigate ();
  const [{basket}, dispatch] = useStateValue();

  return (
    <div className="subtotal">
      <CurrencyFormat
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items):
              <strong> {value} JOD</strong>
            </p>
          </>
        )}
      />
      <button onClick={()=> navigate('/payment')}>Proceed to Checkout</button>
    </div>
  );
}

export default Subtotal;