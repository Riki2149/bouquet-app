import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { httpGetOneFlower } from "../api/flowerServise";
import { useDispatch, useSelector } from "react-redux";
import "../style/FlowerBig.css";
import { FaArrowLeft } from "react-icons/fa";
import { addToCart } from "../features/cartSlice";

const FlowerBig = () => {
    let params = useParams();
    let [flower, setFlower] = useState();
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let currentUser = useSelector(state => state.user.currentUser);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        httpGetOneFlower(params.id)
            .then(res => {
                setFlower(res.data);
            })
            .catch(err => {
                console.log(err.message);
            });
    }, [params.id]);

    const handleAddToCart = () => {
        if (flower) {
            setIsAdding(true);
            dispatch(addToCart(flower));
            
            setTimeout(() => {
                setIsAdding(false);
            }, 600);
        }
    };

    return (
        <div className="flower-big-overlay">
            <div className="flower-big-container">
                <button onClick={() => navigate(-1)} className="back-button">
                    <FaArrowLeft /> Back to Flowers
                </button>
                
                {flower && (
                    <div className="flower-big-content">
                        <div className="flower-big-image-container">
                            <img 
                                className="flower-big-image" 
                                src={`http://localhost:8080/${flower.img}`} 
                                alt={flower.name} 
                            />
                        </div>
                        
                        <div className="flower-big-details">
                            <h1 className="flower-big-name">{flower.name}</h1>
                            
                            <div className="flower-big-price-section">
                                <span className="flower-big-price">${flower.price}</span>
                                
                                {(!currentUser || currentUser.role !== "Admin") && (
                                    <button 
                                        className={`flower-big-add-btn ${isAdding ? 'adding' : ''}`}
                                        onClick={handleAddToCart}
                                        disabled={isAdding}
                                    >
                                        Add to Cart
                                    </button>
                                )}
                            </div>

                            <div className="flower-big-description">
                                <h3>Description</h3>
                                <p>{flower.description}</p>
                            </div>

                            <div className="flower-big-contains">
                                <h3>Flower Contains</h3>
                                <ul className="flower-contains-list">
                                    {flower.flowerContain.map((item, index) => (
                                        <li key={index} className="flower-contains-item">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button 
                                onClick={() => navigate("/")} 
                                className="continue-shopping-btn"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FlowerBig;