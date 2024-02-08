import { React, useState } from "react";
import axios from "axios";
import handleFormChange from "../utils/handleFormChange";

export default AddProductForm = (props) => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState(props.title);
  const [price, setPrice] = useState(props.price);
  const [quantity, setQuantity] = useState(props.quantity);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    try {
      axios.post("/api/products", { title, price, quantity }).then((res) => {
        setVisible(false);
        props.setProducts(props.products.concat(res.data));
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={visible ? "add-form visible" : "add-form"}>
      <p>
        <button className="add-product-button" onClick={() => setVisible(true)}>
          Add A Product
        </button>
      </p>
      <h3>Add Product</h3>
      <form onSubmit={(e) => handleFormSubmit(e)}>
        <div className="input-group">
          <label htmlFor="product-name">Product Name:</label>
          <input
            type="text"
            id="product-name"
            name="product-name"
            onChange={(e) => handleFormChange(e, setTitle)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="product-price">Price:</label>
          <input
            type="number"
            id="product-price"
            name="product-price"
            min="0"
            step="0.01"
            onChange={(e) => handleFormChange(e, setPrice)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="product-quantity">Quantity:</label>
          <input
            type="number"
            id="product-quantity"
            name="product-quantity"
            min="0"
            onChange={(e) => handleFormChange(e, setQuantity)}
            required
          />
        </div>
        <div className="actions form-actions">
          <button type="submit">Add</button>
          <button type="button" onClick={() => setVisible(false)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
