import { Grid } from "@material-ui/core";
import React from "react";
import Product from "./Products/Product/Product";

// product arrray
const products = [
  { id: 1, name: "shoes", description: "Running shoes.", price: "£5" },
  { id: 2, name: "Macbook", description: "Apple macbook.", price: "£10" },
];

const Products = () => {
  return (
    <main>
      <Grid container justify="center" spacing={4}>
        {products.map((product) => (
          // for each value of product in the array renter this item inside the grid
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
            {/* we are passing in a single value from the array of values  */}
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;
