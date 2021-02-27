// rafce makes a functional component

// 36.15 minuets

import { Products, Navbar } from "./Components";
import { commerce } from "./lib/commerce";
import React, { useState, useEffect } from "react";
import Cart from "./Components/Cart/Cart";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Checkout from "./Components/CheckoutForm/Checkout/Checkout";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#ffeb3b",
    },
    // secondary: {
    //   main: "#ffea00 ",
    // },
  },
  // typography: {
  //   h6: {
  //     // ipad / phone
  //     fontWeight: 900,
  //     fontSize: "13vmin",
  //     fontFamily: ["Inter", "sans-serif"].join(","),
  //   },
  //   h4: {
  //     // desktop pc
  //     fontWeight: 900,
  //     fontSize: "3.7vmin",
  //     fontFamily: ["Inter", "sans-serif"].join(","),
  //   },
  //   h5: {
  //     fontWeight: 900,
  //     fontSize: 30,
  //   },
  // },
});

const App = () => {

  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const [products, setProducts] = useState([]);
  // this is a state containing products
  // [] makes it a array
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    // data fetching
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
    // getting the data from the cart and settig it to the state
  };

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  };

  const handleUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });

    setCart(cart);
  };

  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);

    setCart(cart);
  };

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );

      setOrder(incomingOrder);

      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(
    () => {
      fetchProducts();
      fetchCart();
    },
    [
      // as this is set to empty this use effect is only going to run at the start of the render similar to component did mount in class functions
    ]
  );

  // console.log(cart);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar totalItems={cart.total_items} />

        <Switch>
          <Route exact path="/">
            <Products products={products} onAddToCart={handleAddToCart} />
          </Route>

          <Route exact path="/checkout">
            <Checkout
              cart={cart}
              order={order}
              onCaptureCheckout={handleCaptureCheckout}
              error={errorMessage}
            />
          </Route>

          <Route exact path="/Cart">
            <Cart
              handleEmptyCart={handleEmptyCart}
              handleRemoveFromCart={handleRemoveFromCart}
              handleUpdateCartQty={handleUpdateCartQty}
              cart={cart}
            ></Cart>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
