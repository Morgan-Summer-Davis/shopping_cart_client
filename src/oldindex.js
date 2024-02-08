import React from "react";
import ReactDOM from "react-dom/client";

const c = React.createElement;

const App = () => {
  return c("div", {
    id: "app",
    children: [
      c("header", {
        children: [
          c("h1", {}, "The Shop!"),
          c("div", {
            className: "cart",
            children: [
              c("h2", {}, "Your Cart"),
              c("p", {}, "Your cart is empty"),
              c("p", {}, "Total: $0"),
              c("button", {
                className: "checkout",
                disabled: true,
              },
              "Checkout"),
            ],
          }),
        ],
      }),
      c("main", {
        children: [
          c("div", {
            className: "product-listing",
            children: [
              c("h2", {}, "Products"),
              c("ul", {
                className: "product-list",
                children: [
                  c(Product, {
                    name: "Amazon Kindle E-reader",
                    price: 79.99,
                    quantity: 5,
                  }),
                  c(Product, {
                    name: "Apple 10.5-Inch iPad Pro",
                    price: 649.99,
                    quantity: 2,
                  }),
                  c(Product, {
                    name: "Yamaha Portable Keyboard",
                    price: 155.99,
                    quantity: 0,
                  }),
                ],
              }),
            ],
          }),
          c("div", {
            className: "add-form",
            children: [
              c("p", {
                children: [
                  c("button", {
                    className: "add-product-button"
                  },
                  "Add A Product"),
                ],
              }),
              c("h3", {}, "Add Product"),
              c("form", {
                children: [
                  c("div", {
                    className: "input-group",
                    children: [
                      c("label", {
                        for: "product-name"
                      }, "Product Name:"),
                      c("input", {
                        type: "text",
                        id: "product-name",
                        name: "product-name",
                        required: true,
                      }),
                    ],
                  }),
                  c("div", {
                    className: "input-group",
                    children: [
                      c("label", {
                        for: "product-price"
                      }, "Price:"),
                      c("input", {
                        type: "number",
                        id: "product-price",
                        name: "product-price",
                        min: 0,
                        step: 0.01,
                        required: true,
                      }),
                    ],
                  }),
                  c("div", {
                    className: "input-group",
                    children: [
                      c("label", {
                        for: "product-quantity"
                      }, "Quantity:"),
                      c("input", {
                        type: "number",
                        id: "product-quantity",
                        name: "product-quantity",
                        min: 0,
                        required: true,
                      }),
                    ],
                  }),
                  c("div", {
                    className: "actions form-actions",
                    children: [
                      c("button", {
                        type: "submit",
                      }, "Add"),
                      c("button", {
                        type: "button",
                      }, "Cancel"),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
};

const Product = (props) => {
  return c("li", {
    className: "product",
    children: [
      c("div", {
        className: "product-details",
        children: [
          c("h3", {}, props.name),
          c("p", {
            className: "price",
          },
          `$${props.price}`),
          c("p", {
            className: "quantity",
          },
          `${props.quantity} left in stock`),
          c("div", {
            className: "actions product-actions",
            children: [
              c("button", {
                className: "add-to-cart",
              },
              "Add to Cart"),
              c("button", {
                className: "edit",
              },
              "Edit"),
            ],
          }),
          c("button", {
            className: "delete-button",
            children: [
              c("span", {}, "X")
            ],
          }),
        ],
      }),
    ],
  });
};

const rootElement = document.getElementById("root");
console.log(rootElement);
console.log(App);
ReactDOM.createRoot(rootElement).render(c(App));