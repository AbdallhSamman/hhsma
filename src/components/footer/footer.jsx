import { Link } from '@mui/material';
import React from 'react';
import '../footer/footer.css';
 function Footer() {
  return <div>
<footer>
    <div className="top text-center">
      <Link to="#root">Back to top</Link>
    </div>

    <div className="middle">
      <div className="footer__center">
        <ul>
          <li><h3>Get to Know Us</h3></li>
          <li><Link to="#">Careers</Link></li>
          <li><Link to="#">About Amazon</Link></li>
          <li><Link to="#">Investor Relations</Link></li>
          <li><Link to="#">Amazon Devices</Link></li>
        </ul>
        <ul>
          <li><h3>Make Money with Us</h3></li>
          <li><Link to="#">Sell on Amazon</Link></li>
          <li><Link to="#">Sell Your Services on Amazon</Link></li>
          <li><Link to="#">Sell on Amazon Business</Link></li>
          <li><Link to="#">Sell Your Apps on Amazon</Link></li>
          <li><Link to="#">Become an Affiliate</Link></li>
        </ul>
        <ul>
          <li><h3>Amazon Payment Products</h3></li>
          <li><Link to="#">Amazon Rewards Visa Signature Cards</Link></li>
          <li><Link to="#">Amazon.com Store Card</Link></li>
          <li><Link to="#">Amazon.com Corporate Credit Line</Link></li>
          <li><Link to="#">Shop with Points</Link></li>
          <li><Link to="#">Credit Card Marketplace</Link></li>
        </ul>
        <ul>
          <li><h3>Let Us Help You</h3></li>
          <li><Link to="#">Your Account</Link></li>
          <li><Link to="#">Your Orders</Link></li>
          <li><Link to="#">Shipping Rates &amp; Policies</Link></li>
          <li><Link to="#">Returns &amp; Replacements</Link></li>
          <li><Link to="#">Help</Link></li>
        </ul>
      </div>
      <ul className="copy text-center">
        <li><img
          className="logo"
          src="https://pnggrid.com/wp-content/uploads/2021/05/Amazon-Logo-Transparent-1024x310.png"
          alt="logo"
        /></li>
        <li><Link to="#" className="select"><i className="fa fa-globe" aria-hidden="true"></i> English</Link></li>
        <li><Link to="#" className="select"><i className="flag-icon-jordan"></i>Jordan</Link></li>
      </ul>
    </div>

   
  </footer>
  </div>;
}
export default Footer;