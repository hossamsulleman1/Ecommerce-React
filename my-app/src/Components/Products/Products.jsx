import { Grid } from "@material-ui/core";
import React from "react";
import Product from "./Product/Product";
import useStyles from "./styles.js";

// product arrray
// const products = [
//   {
//     id: 1,
//     name: "shoes",
//     description: "Running shoes.",
//     price: "£5",
//     image:
//       "https://media.discordapp.net/attachments/722938944882343959/813717075499417606/unknown.png?width=1014&height=676",
//   },
//   {
//     id: 2,
//     name: "Macbook",
//     description: "Apple macbook.",
//     price: "£10",
//     image:
//       "https://media.discordapp.net/attachments/722938944882343959/813717075499417606/unknown.png?width=1014&height=676",
//   },
// ];

const Products = ({ products, onAddToCart }) => {
  // sent as props but desctructured
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justify="center" spacing={4}>
        {products.map((product) => (
          // for each value of product in the array renter this item inside the grid
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} onAddToCart={onAddToCart} />
            {/* we are passing in a single value from the array of values  */}
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;
