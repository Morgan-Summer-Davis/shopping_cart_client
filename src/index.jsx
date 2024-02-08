import { React, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

import Header from "./components/Header";
import ProductListing from "./components/ProductListing";
import AddProductForm from "./components/AddProductForm";

import { getProducts } from "./services/products";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    getProducts().then((r) => setProducts(r));
  }, []);

  return (
    <div id="app">
      <Header cart={cart} setCart={setCart} />
      <main>
        <ProductListing
          products={products}
          setProducts={setProducts}
          cart={cart}
          setCart={setCart}
        />
        <AddProductForm products={products} setProducts={setProducts} />
      </main>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(<App />);
