import { useState, useEffect } from "react";
import { getCart } from "../services/cart";

export default Cart = (props) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getCart().then((r) => {
      props.setCart(r);
      setTotal(r.reduce((accumulator, curr) => accumulator + curr.price, 0));
    });
  }, []);

  useEffect(() => {
    setTotal(
      props.cart.reduce((accumulator, curr) => accumulator + curr.price, 0),
    );
  }, [props.cart.length]);

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {props.cart && props.cart.length > 0 ? (
        <CartProductList
          cart={props.cart}
          setCart={props.setCart}
          total={total}
        />
      ) : (
        <>
          <p>Your cart is empty</p>
          <p>Total: $0</p>
          <button className="checkout" disabled>
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

CartProductList = (props) => {
  return (
    <>
      <table className="cart-items">
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {props.cart.map((product) => {
            return <CartProduct {...product} key={product._id} />;
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" className="total">
              Total: ${props.total}
            </td>
          </tr>
        </tfoot>
      </table>
      <button className="checkout" onClick={() => props.setCart([])}>
        Checkout
      </button>
    </>
  );
};

CartProduct = (props) => {
  return (
    <tr>
      <td>{props.title}</td>
      <td>{props.quantity}</td>
      <td>${props.price}</td>
    </tr>
  );
};
