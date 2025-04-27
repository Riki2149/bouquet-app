import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { httpAddOrder } from "../api/orderServise";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  Divider,
  FormControl,
  Grid,
  Stepper,
  Step,
  StepLabel,
  CircularProgress
} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import '../style/Checkout.css'; 
import { removeAllCart } from "../features/cartSlice";

const CheckOut = () => {
  const currentUser = useSelector(state => state.user.currentUser);
  const { arrCart } = useSelector(state => state.cart);
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  let dispatch = useDispatch();

  const totalPrice = useSelector(state => state.cart.totalPrice);
  const steps = ['Review Order', 'Shipping Details', 'Confirmation'];

  const changeAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!arrCart || arrCart.length === 0) {
      setMessage("Your cart is empty");
      setSuccess(false);
      return;
    }
    if (!address) {
      setMessage("Please enter your shipping address");
      setSuccess(false);
      return;
    }
    setLoading(true);
    try {
      const products = arrCart.map(item => ({
        _id: item._id,
        name: item.name,
        price: item.price,
        qty: item.qty
      }));
      const orderData = {
        userId: currentUser._id,
        products: products,
        address: address,
        OrdDate: new Date(),
        targetDate: new Date(new Date().setDate(new Date().getDate() + 7))
      };
      let response = await httpAddOrder(orderData);
      console.log(response.data);
      setSuccess(true);
      setMessage("Your order has been placed successfully!");
      dispatch(removeAllCart())
      setActiveStep(2); 
    } catch (err) {
      setSuccess(false);
      setMessage(err.response?.data.message || "An error occurred while processing your order");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', py: 4, px: 2 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, bgcolor: '#fff9fb' }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#d81b60', fontWeight: 'bold', mb: 3, textAlign: 'center' }}>
          Complete Your Order
        </Typography>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === 0 && (
          <Box>
            <Typography variant="h6" className="order-summary">
              Order Summary
            </Typography>
            {arrCart.length === 0 ? (
              <Alert severity="info" sx={{ mb: 2 }}>Your cart is empty</Alert>
            ) : (
              <>
                <Box sx={{ mb: 3 }}>
                  {arrCart.map((item) => (
                    <Box key={item._id} className="cart-item">
                      <Grid container alignItems="center">
                        <Grid item xs={7}>
                          <Typography fontWeight="medium">{item.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Quantity: {item.qty}
                          </Typography>
                        </Grid>
                        <Grid item xs={5} sx={{ textAlign: 'right' }}>
                          <Typography>₪{item.price} × {item.qty}</Typography>
                          <Typography fontWeight="bold">₪{item.price * item.qty}</Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  ))}
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box className="total-amount">
                  <Typography variant="h6">Total Amount:</Typography>
                  <Typography variant="h6" fontWeight="bold" color="#d81b60">₪{totalPrice}</Typography>
                </Box>
                <Box className="continue-button">
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    className="pink-button"
                  >
                    Continue to Shipping
                  </Button>
                </Box>
              </>
            )}
          </Box>
        )}
        {activeStep === 1 && (
          <form onSubmit={handleSubmit}>
            <Typography variant="h6" className="shipping-info">
              Shipping Information
            </Typography>
            {message && !success && (
              <Alert severity="error" sx={{ mb: 2 }}>{message}</Alert>
            )}
            <FormControl fullWidth sx={{ mb: 3 }}>
              <TextField
                id="address"
                label="Shipping Address"
                fullWidth
                multiline
                rows={3}
                value={address}
                onChange={changeAddress}
                placeholder="Enter your full shipping address"
                required
                className="pink-textfield"
              />
            </FormControl>
            <Typography variant="body2" className="shipping-text">
              <LocalShippingIcon sx={{ mr: 1, fontSize: '1rem' }} />
              Estimated delivery: 7 days
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button onClick={handleBack}>
                Back to Review
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                className="pink-button"
              >
                {loading ? "Processing..." : "Place Order"}
              </Button>
            </Box>
          </form>
        )}
        {activeStep === 2 && (
          <Box className="confirmation-text">
            <Alert severity="success" sx={{ mb: 3 }}>
              {message || "Thank you for your order!"}
            </Alert>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Your order has been placed successfully!
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              We have sent a confirmation email to your registered email address.
            </Typography>
            <Button
              variant="contained"
              href="/"
              className="confirmation-button"
            >
              Continue Shopping
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default CheckOut;
