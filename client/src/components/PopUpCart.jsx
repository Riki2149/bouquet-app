import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Drawer, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import "../style/PopUpCart.css";

const PopUpCart = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(true);
  const { arrCart, totalPrice } = useSelector(state => state.cart);
  const [highlightedItemId, setHighlightedItemId] = useState(null);
  const closeTimeoutRef = useRef(null);
  const prevCartLengthRef = useRef(arrCart.length);

  useEffect(() => {
    // בדיקה אם נוסף פריט חדש לסל
    if (arrCart.length > prevCartLengthRef.current) {
      // מוצא את הפריט האחרון שנוסף
      const lastAddedItem = arrCart[arrCart.length - 1];

      // מסמן את הפריט החדש
      setHighlightedItemId(lastAddedItem._id);

      // מסיר את ההדגשה אחרי 2 שניות
      setTimeout(() => {
        setHighlightedItemId(null);
      }, 2000);

      // מאפס את הטיימר של הסגירה האוטומטית
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }

      // קובע טיימר חדש לסגירה אוטומטית
      closeTimeoutRef.current = setTimeout(() => {
        handleClose();
      }, 3000);

      // עדכון הערך הקודם של אורך הסל
      prevCartLengthRef.current = arrCart.length;
    }
  }, [arrCart]);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300);
  };

  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={handleClose}
      className="popup-cart-drawer"
      sx={{
        '& .MuiDrawer-paper': {
          width: { xs: '100%', sm: '300px' },
          height: '100%',
        }
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="popup-cart-content">
          <div className="popup-cart-header">
            <h2 className="popup-cart-title">Your basket</h2>
            <button className="popup-cart-close" onClick={handleClose}>
              <CloseIcon />
            </button>
          </div>

          <div className="popup-cart-items">
            {arrCart.map((item, index) => (
              <div
                key={index}
                className={`popup-cart-item ${highlightedItemId === item._id ? 'highlight-item' : ''
                  }`}
              >
                <div className="popup-cart-item-image">
                  <img
                    src={`http://localhost:8080/${item.img}`}
                    alt={item.name}
                  />
                </div>
                <div className="popup-cart-item-details">
                  <h3 className="popup-cart-item-name">{item.name}</h3>
                  <div className="popup-cart-item-info">
                    <span className="popup-cart-item-price">${item.price}</span>
                    <span className="popup-cart-item-quantity">
                      qty: {item.qty}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="popup-cart-summary">
            <p className="popup-cart-item-count">
              {arrCart.length} {arrCart.length === 1 ? 'Item' : 'Items'} in the basket
            </p>
            <p className="popup-cart-total">Total: ${totalPrice.toFixed(2)}</p>
          </div>

          <div className="popup-cart-actions">
            <Link
              to="/cart"
              className="view-cart-btn"
              onClick={handleClose}
            >
              Viewing the basket
            </Link>
            <Link
              to="/checkout"
              className="checkout-btn"
              onClick={handleClose}
            >
              payment
            </Link>
          </div>
        </div>
      </Box>
    </Drawer>
  );
};

export default PopUpCart;