import { useState } from "react"; 
import { useSelector } from "react-redux"; 
import { useNavigate } from "react-router-dom"; 
import FlowerCart from "../components/FlowerCart"; 
import { Box, Typography, Button, Paper, Divider, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'; 
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; 
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'; 
import '../style/CartList.css'; 

const CartList = () => { 
  const { arrCart, totalPrice } = useSelector(state => state.cart); 
  const { currentUser } = useSelector(state => state.user); 
  const [message, setMessage] = useState(""); 
  const navigate = useNavigate(); 

  const handleCheckout = () => { 
    if (currentUser) { 
      navigate("/checkOut"); 
    } else { 
      setMessage("You must login first to complete your purchase"); 
    } 
  };

  return ( 
    <Box className="cart-list-container">
      <Paper elevation={3} className="cart-list-paper">
        <Box className="cart-list-header">
          <ShoppingCartIcon className="cart-list-header-icon" />
          <Typography variant="h4" component="h1" className="cart-list-title">
            Your Shopping Cart
          </Typography>
        </Box>

        {arrCart.length === 0 ? (
          <Box className="cart-list-empty">
            <Typography variant="h6" className="cart-list-empty-message">
              Your shopping cart is empty
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/')}
              startIcon={<ShoppingBagIcon />}
              className="cart-list-empty-button"
            >
              Continue Shopping
            </Button>
          </Box>
        ) : (
          <>
            <TableContainer component={Paper} className="cart-list-table-container">
              <Table>
                <TableHead>
                  <TableRow >
                    <TableCell className="title">Product</TableCell>
                    <TableCell align="center" className="title">Price</TableCell>
                    <TableCell align="center" className="title">Quantity</TableCell>
                    <TableCell align="right" className="title">Total</TableCell>
                    <TableCell align="center" className="title">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {arrCart.map((item) => (
                    <FlowerCart key={item._id} flower={item} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Divider className="cart-list-divider" />

            <Box className="cart-list-total">
              <Typography variant="h5">Total Price:</Typography>
              <Typography variant="h5" className="cart-list-total-price">
                ₪{totalPrice}
              </Typography>
            </Box>

            <Box className="cart-list-checkout">
              <Button
                variant="contained"
                onClick={handleCheckout}
                startIcon={<ShoppingBagIcon />}
                className="cart-list-checkout-button"
              >
                Proceed to Checkout
              </Button>
            </Box>
          </>
        )}

        {message && (
          <Alert severity="warning" sx={{ my: 2 }}>
            {message}
          </Alert>
        )}
      </Paper>
    </Box>
  );
};

export default CartList;
