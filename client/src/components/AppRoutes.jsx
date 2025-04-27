import { Routes, Route } from "react-router-dom";
import AddOrUpdateFlower from "../pages/AddOrUpdateFlower";
import CartList from "../pages/CartList";
import CheckOut from "../pages/CheckOut";
import FlowerList from "../pages/FlowerList";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import FlowerBig from "./FlowerBig";
import ProtectedRoute from "./ProtectedRoute";



const AppRoutes = () => {
  return (<Routes>
    <Route path="home" element={<FlowerList />} >
      <Route path="flowerBig/:id" element={<FlowerBig />} />
    </Route>
    <Route path="cart" element={<CartList />} />
    <Route path="login" element={<Login />} />
    <Route path="signUp" element={<SignUp />} />
    <Route path="addOrUpdateFlower" element={<ProtectedRoute><AddOrUpdateFlower /></ProtectedRoute>} />
    <Route path="checkOut" element={<CheckOut />} />
    <Route path="*" element={<FlowerList />} />
  </Routes>
  )
}

export default AppRoutes;