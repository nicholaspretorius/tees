import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import logo from "../images/gatsby-icon.png";

const isActive = ({ isCurrent }) => {
  return { className: isCurrent ? "active" : "navlink" };
};

const NavLink = props => <Link getProps={isActive} {...props} />;

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <span style={{ display: "flex", alignItems: "center" }}>
        <img
          src={logo}
          style={{
            width: "50px",
            margin: "0 5px",
            borderRadius: "50%",
            border: "3px solid orange"
          }}
          alt="Tees"
        />
        <h1 style={{ margin: 0 }}>
          <NavLink to="/">{siteTitle}</NavLink>
        </h1>
      </span>

      <NavLink to="/blog">Blog</NavLink>
      <NavLink to="/products">Shop</NavLink>

      <div
        style={{
          color: "white",
          cursor: "pointer",
          fontSize: ".8rem"
        }}
        className="snipcart-summary snipcart-checkout"
      >
        <div>
          <strong>My Cart</strong>
        </div>
        <div>
          <span className="snipcart-total-items" /> Items in Cart
        </div>
        <div>
          Total Price{" "}
          <span
            className="snipcart-total-price"
            style={{ fontWeight: "bold" }}
          />
        </div>
      </div>
    </div>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ``
};

export default Header;
