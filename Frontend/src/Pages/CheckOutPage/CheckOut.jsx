import React, { useState } from "react";
import "./CheckOut.css";
import img from "../../assets/Phone.jpg";
import { Link } from "react-router-dom";

const CheckOutPage = () => {
  const initialItems = [
    { id: "bh", name: "Bluetooth Headphone", price: 20, quantity: 2 },
    { id: "l", name: "Laptop", price: 600, quantity: 1 },
    { id: "s", name: "Bluetooth Speaker", price: 15, quantity: 4 },
    { id: "cl", name: "Camera Lens", price: 100, quantity: 1 },
  ];

  const [items, setItems] = useState(initialItems);

  const handleDeleteAll = () => {
    setItems([]);
  };

  const handleIncrement = (itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const calculateTotalAmount = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="grid-container">
      <div className="Links">
        {" "}
        <Link to="/">
          Home / <i>Cart</i>
        </Link>
      </div>
      <div className="cart">
        <h2 className="CartHeading">
          Shopping Cart (<span id="item-num">{items.length}</span>)
        </h2>
      </div>
      <div className="cartinfo">
      <div className="cartinfo1">
        <span className="ProductSpan">PRODUCT</span>
        <span>PRICE</span>
        </div>
        <div className="cartinfo2">
        <span>QUINTITY</span>
        <span>TOTAL-PRICE</span>
        </div>
        </div>
     

      {items.map((item) => (
        <div className="item" key={item.id}>
            <div className="CartProduct">
          <img className="ProductImg" src={img} alt={item.name} />
          <p>{item.name}</p>
          </div>
          <p>{item.price}$</p>
          <div className="quantity">
            <button
              onClick={() => handleDecrement(item.id)}
              className="btn plus"
            >
              -
            </button>
            <p className="number">{item.quantity}</p>
            <button
              onClick={() => handleIncrement (item.id)}
              className="btn minus"
            >
              +
            </button>
          </div>
          <h3 className="CheckOutPrice">
            Total:<span>{item.price * item.quantity}</span>$
          </h3>
        </div>
      ))}

      <div className="total">
        <h4 id="total">Total:{calculateTotalAmount()}$</h4>
        <p className="TotalShipping">Vat and Shipping not included</p>
        <div className="Buttons">
        <button  id="buy" className="CartButton">
          CheckOut
        </button>
        <button onClick={handleDeleteAll} className="DeleteButton">
          EmptyCart
        </button>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
