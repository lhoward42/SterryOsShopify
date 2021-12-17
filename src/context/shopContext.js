import React, { Component } from "react";

import Client from "shopify-buy";

const ShopContext = React.createContext();

const client = Client.buildClient({
  domain: process.env.REACT_APP_SHOPIFY_DOMAIN,
  storefrontAccessToken: process.env.REACT_APP_SHOPIFY_API,
});



export class ShopProvider extends Component {
  state = {
    product: {},
    quantity: 0,
    products: [],
    checkout: {},
    isCartOpen: false,
    isMenuOpen: false,
  };

  componentDidMount() {
    if (localStorage.checkout) {
      this.fetchCheckout(localStorage.checkout);
    } else {
      this.createCheckout();
    }
  }

  createCheckout = async () => {
    const checkout = await client.checkout.create();
    localStorage.setItem("checkout_id", checkout);
    this.setState({ checkout: checkout });
    console.log(checkout);
  };

  fetchCheckout = async (checkoutId) => {
    client.checkout
      .fetch(checkoutId)
      .then((checkout) => {
        this.setState({ checkout: checkout });
        console.log(checkout);
      })
      .catch((error) => console.log(error));
  };

  addItemToCheckout = async (variantId, quantity) => {
    const lineItemsToAdd = [
      {
        variantId,
        quantity: parseInt(quantity, 10),
      },
    ];

    const checkout = await client.checkout.addLineItems(
      this.state.checkout.id,
      lineItemsToAdd
    );
    this.setState({ checkout: checkout });
    console.log(checkout, lineItemsToAdd);
    this.openCart();
  };

  updateCheckoutQuantity = async (id, quantity) => {
  try {
    const lineItemsToUpdate = [
      {
      id,
      quantity: parseInt(quantity, 10),
    },
  ]

  console.log(lineItemsToUpdate, this.state.checkout.id);

    const checkout = await client.checkout.updateLineItems(this.state.checkout.id, lineItemsToUpdate)
   
    console.log(checkout);
    this.setState({ checkout: checkout })
  } catch (err) {
    console.error(err);
  }
  };

  removeLineItem = async (lineItemIdsToRemove) => {
    const checkout = await client.checkout.removeLineItems(
      this.state.checkout.id,
      lineItemIdsToRemove
    );
    this.setState({ checkout: checkout });
  };

  fetchAllProducts = async () => {
    const products = await client.product.fetchAll();
    this.setState({ products: products });
  };

  fetchProductWithHandle = async (handle) => {
    const product = await client.product.fetchByHandle(handle);
    this.setState({ product: product });
    return product;
  };

  closeCart = () => {
    this.setState({ isCartOpen: false });
  };

  openCart = () => {
    this.setState({ isCartOpen: true });
  };

  closeMenu = () => {
    this.setState({ isMenuOpen: false });
  };

  openMenu = () => {
    this.setState({ isMenuOpen: true });
  };

  render() {
    console.log(this.state.checkout);

    return (
      <ShopContext.Provider
        value={{
          ...this.state,
          updateCheckoutQuantity: this.updateCheckoutQuantity,
          fetchAllProducts: this.fetchAllProducts,
          fetchProductWithHandle: this.fetchProductWithHandle,
          addItemToCheckout: this.addItemToCheckout,
          removeLineItem: this.removeLineItem,
          closeCart: this.closeCart,
          openCart: this.openCart,
          closeMenu: this.closeMenu,
          openMenu: this.openMenu,
        }}
      >
        {this.props.children}
      </ShopContext.Provider>
    );
  }
}

const ShopConsumer = ShopContext.Consumer;

export { ShopConsumer, ShopContext };

export default ShopProvider;
