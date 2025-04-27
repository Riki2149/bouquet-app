import { useDispatch } from "react-redux";
import { addToCart, deleteOneFromCart, removeFromCart } from "../features/cartSlice";
import { 
  TableCell,
  TableRow,
  Avatar, 
  Tooltip,
  IconButton,
  Typography,
  Box
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import "../style/FlowerCart.css";

const FlowerCart = ({ flower }) => {
  const dispatch = useDispatch();

  return (
    <TableRow className="flower-cart-row">
      {/* מוצר */}
      <TableCell className="flower-cart-cell">
        <Box className="flower-cart-product">
          <Avatar 
            src={`http://localhost:8080/${flower.img}`} 
            alt={flower.name}
            className="flower-cart-avatar"
            variant="rounded"
          />
          <Box>
            <Typography variant="h6" className="flower-cart-name">
              {flower.name}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      
      {/* מחיר */}
      <TableCell align="center" className="flower-cart-cell">
        <Typography variant="body1" className="flower-cart-price">
          ₪{flower.price}
        </Typography>
      </TableCell>
      
      {/* כמות */}
      <TableCell align="center" className="flower-cart-cell">
        <Box className="flower-cart-quantity">
          <IconButton 
            className="flower-cart-quantity-button" 
            size="small" 
            onClick={() => dispatch(deleteOneFromCart(flower))}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
          
          <Typography variant="body1" className="flower-cart-quantity-text">
            {flower.qty}
          </Typography>
          
          <IconButton 
            className="flower-cart-quantity-button" 
            size="small" 
            onClick={() => dispatch(addToCart(flower))}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>
      </TableCell>
      
      {/* סה"כ */}
      <TableCell align="right" className="flower-cart-cell">
        <Typography variant="body1" className="flower-cart-total">
          ₪{flower.price * flower.qty}
        </Typography>
      </TableCell>
      
      {/* פעולות */}
      <TableCell align="center" className="flower-cart-cell">
        <Tooltip title="Remove from cart">
          <IconButton 
            className="flower-cart-remove-button"
            onClick={() => dispatch(removeFromCart(flower))}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

export default FlowerCart;
