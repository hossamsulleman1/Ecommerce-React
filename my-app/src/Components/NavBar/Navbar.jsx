import React from 'react'
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';


import logo from "../../Images/Demo.svg"
import useStyles from './styles'

const Navbar = () => {
    const classes = useStyles();
    return (
        <>
          <AppBar position="fixed" className={classes.appBar} color="inherit">
              <Toolbar>
                  <Typography variant="h6" className={classes.title} color="inherit" >





                  <img src={logo} alt="commerce.js" height="25px" className={classes.image} />
                   Commerce.js
                  </Typography>
                  <div className={classes.grow}/>
{/* classes.grow makes the div take up as much space as it needs to  */}
                  
                  <div className={classes.button}>
<IconButton aria-label="show cart items" color="inherit">
    <Badge badgeContent={2} color="secondary">
        <ShoppingCart></ShoppingCart>
    </Badge>
</IconButton>
                  </div>


                  </Toolbar>
     
             
              </AppBar>  
        </>
    )
}

export default Navbar
