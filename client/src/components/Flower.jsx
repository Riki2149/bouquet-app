import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { httpDeleteFlower } from "../api/flowerServise";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../style/Flower.css";
import PopUpCart from "./PopUpCart";

const Flower = ({ flower, deleteFlower }) => {
    let dispatch = useDispatch();
    let currentUser = useSelector(state => state.user.currentUser);
    const navigate = useNavigate();
    let [message, setMessage] = useState("");
    const [showPopUp, setShowPopUp] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const AddToCart = () => {
        dispatch(addToCart(flower));
        if (!showPopUp) {
            setShowPopUp(true);
            setTimeout(() => {
                setShowPopUp(false);
            }, 3000);
        }
    };

    const handleDeleteClick = () => {
        setShowDeleteConfirmation(true);
    };

    const confirmDelete = () => {
        httpDeleteFlower(flower._id)
            .then(res => {
                deleteFlower(flower._id);
                setShowDeleteConfirmation(false);
            })
            .catch(err => {
                setMessage(err.response?.data.message);
                setShowDeleteConfirmation(false);
            });
    };

    const cancelDelete = () => {
        setShowDeleteConfirmation(false);
    };

    return (
        <>
            {showPopUp && <PopUpCart />}
            
            {showDeleteConfirmation && (
                <div className="delete-confirmation-overlay">
                    <div className="delete-confirmation-modal">
                        <h3>Are you sure you want to delete this flower?</h3>
                        <p>This action cannot be undone.</p>
                        <div className="delete-confirmation-buttons">
                            <button onClick={confirmDelete} className="confirm-delete-btn">Delete</button>
                            <button onClick={cancelDelete} className="cancel-delete-btn">Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flower-item">
                <div className="flower-header">
                    <h2 className="flower-name">{flower.name}</h2>
                    <span className="flower-price">${flower.price}</span>
                </div>

                <div
                    className="flower-image-container"
                    onMouseEnter={() => setShowOverlay(true)}
                    onMouseLeave={() => setShowOverlay(false)}
                >
                    <Link to={`flowerBig/${flower._id}`} className="flower-image-wrapper">
                        <img
                            className="flower-image"
                            src={`http://localhost:8080/${flower.img}`}
                            alt={flower.name}
                        />
                        <div className={`flower-hover-info ${showOverlay ? 'visible' : ''}`}>
                            <span>View Details</span>
                        </div>
                    </Link>
                </div>

                <div className="flower-bottom-section">
                    <div className="flower-contains">
                        <span className="flower-contains-title">FLOWER CONTAINS:</span>
                        <div className="flower-contains-list">
                            {flower.flowerContain.map((item, index) => (
                                <span key={index} className="flower-contain-item">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flower-actions">
                        {!currentUser || currentUser.role !== "Admin" ? (
                            <button
                                className="add-to-cart-btn-new"
                                onClick={AddToCart}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cart-icon">
                                    <circle cx="9" cy="21" r="1"></circle>
                                    <circle cx="20" cy="21" r="1"></circle>
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                </svg>
                            </button>
                        ) : (
                            <div className="admin-actions-new">
                                <button
                                    className="delete-flower-btn-new"
                                    onClick={handleDeleteClick}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="delete-icon">
                                        <polyline points="3 6 5 6 21 6"></polyline>
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                    </svg>
                                </button>

                                <button
                                    className="update-flower-btn-new"
                                    onClick={() => {
                                        navigate("/addOrUpdateFlower", { state: { flowerToEdit: flower } });
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="edit-icon">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {message && (
                    <div className="error-message">
                        {message}
                    </div>
                )}
            </div>
        </>
    );
};

export default Flower;