import { useEffect, useState } from "react";
import { httpGetAllFlower, httpGetCountPages } from "../api/flowerServise";
import Flower from "../components/Flower.jsx";
import { Outlet, useLocation } from "react-router-dom";
import "../style/FlowerList.css";

const FlowerList = () => {
  let [arrFlowers, setArrFlowers] = useState([]);
  let [cntPages, setCntPages] = useState(1);
  let [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const isShowingFlowerBig = location.pathname.includes("/flowerBig/");

  useEffect(() => {
    httpGetCountPages()
      .then(res => setCntPages(res.data.countOfPages))
      .catch(err => console.error("Error: cannot get count of pages", err));
  }, []);

  useEffect(() => {
    httpGetAllFlower(currentPage)
      .then(res => setArrFlowers(res.data))
      .catch(err => console.error("Error: cannot get flowers from the server", err));
  }, [currentPage]);

  const deleteFlower = (flowerID) => {
    setArrFlowers(arrFlowers.filter(flower => flower._id !== flowerID));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= cntPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Custom pagination component
  const CustomPagination = () => {
    return (
      <div className="custom-pagination-container">
        <div 
          className={`pagination-arrow left ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          ←
        </div>
        <div className="current-page-display">{currentPage}</div>
        <div 
          className={`pagination-arrow right ${currentPage === cntPages ? 'disabled' : ''}`}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          →
        </div>
      </div>
    );
  };

  return (
    <div className="flower-list-container">
      {!isShowingFlowerBig && (
        <h1 className="flower-list-title">Bridal Flower Bouquets</h1>
      )}
      
      {isShowingFlowerBig ? (
        <div className="flower-big-wrapper">
          <Outlet />
        </div>
      ) : (
        <>
          <div className="flowers-grid">
            {arrFlowers.map((item) => (
              <div key={item._id} className="flower-item-wrapper">
                <Flower flower={item} deleteFlower={deleteFlower} />
              </div>
            ))}
          </div>
          <CustomPagination />
        </>
      )}
    </div>
  );
};

export default FlowerList;
