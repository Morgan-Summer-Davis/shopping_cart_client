import Cart from "./Cart";

export default Header = (props) => {
  return (
    <header>
      <h1>The Shop!</h1>
      <Cart cart={props.cart} setCart={props.setCart} />
    </header>
  );
};
