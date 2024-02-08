import { React, useState } from "react";

import handleFormChange from "../utils/handleFormChange";
import { deleteProduct, editProduct } from "../services/products";
import { addToCart } from "../services/cart";

export default ProductListing = (props) => {
  return (
    <>
      <h2>Products</h2>
      <ul className="product-list">
        {props.products.map((product) => {
          return (
            <Product
              {...product}
              key={product._id}
              cart={props.cart}
              setCart={props.setCart}
            />
          );
        })}
      </ul>
    </>
  );
};

const Product = (props) => {
  const [title, setTitle] = useState(props.title);
  const [price, setPrice] = useState(props.price);
  const [quantity, setQuantity] = useState(props.quantity);
  const [visible, setVisible] = useState(true);
  const [editVisible, setEditVisible] = useState(false);

  const handleDelete = () => {
    deleteProduct(props._id).then(() => {
      setVisible(false);
    });
  };

  const handleAddToCart = () => {
    addToCart(props._id).then((res) => {
      if (res.item) {
        const i = props.cart.findIndex((p) => p._id === res.item._id);
        if (i >= 0) {
          props.setCart(
            props.cart
              .slice(0, i)
              .concat(res.item)
              .concat(props.cart.slice(i + 1)),
          );
        } else {
          props.setCart(props.cart.concat(res.item));
        }

        setQuantity((prevState) => prevState - 1);
      }
    });
  };

  return (
    <li className="product" style={{ display: visible ? "list-item" : "none" }}>
      <div className="product-details">
        <h3>{title}</h3>
        <p className="price">${price}</p>
        <p className="quantity">{quantity} left in stock</p>
        <div className="actions product-actions">
          <button className="add-to-cart" onClick={() => handleAddToCart()}>
            Add to Cart
          </button>
          <button
            className="edit"
            onClick={() => setEditVisible((prevState) => !prevState)}
          >
            Edit
          </button>
        </div>
        <button className="delete-button" onClick={handleDelete}>
          <span>X</span>
        </button>
      </div>
      <EditProductForm
        {...props}
        visible={editVisible}
        setTitle={setTitle}
        setPrice={setPrice}
        setQuantity={setQuantity}
        setVisible={setEditVisible}
      />
    </li>
  );
};

const EditProductForm = (props) => {
  const [editTitle, setEditTitle] = useState(props.title);
  const [editPrice, setEditPrice] = useState(props.price);
  const [editQuantity, setEditQuantity] = useState(props.quantity);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    editProduct(props._id, editTitle, editPrice, editQuantity).then((res) => {
      props.setTitle(res.data.title);
      props.setPrice(res.data.price);
      props.setQuantity(res.data.quantity);
      props.setVisible(false);
    });
  };

  return (
    <div
      className="edit-form"
      style={{ display: props.visible ? "block" : "none" }}
    >
      <h3>Edit Product</h3>
      <form onSubmit={(e) => handleFormSubmit(e)}>
        <div className="input-group">
          <label htmlFor="product-name">Product Name</label>
          <input
            type="text"
            id="product-name"
            value={editTitle}
            aria-label="Product Name"
            onChange={(e) => handleFormChange(e, setEditTitle)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-price">Price</label>
          <input
            type="number"
            id="product-price"
            value={editPrice}
            aria-label="Product Price"
            onChange={(e) => handleFormChange(e, setEditPrice)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-quantity">Quantity</label>
          <input
            type="number"
            id="product-quantity"
            value={editQuantity}
            aria-label="Product Quantity"
            onChange={(e) => handleFormChange(e, setEditQuantity)}
          />
        </div>

        <div className="actions form-actions">
          <button type="submit">Update</button>
          <button type="button" onClick={() => props.setVisible(false)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
