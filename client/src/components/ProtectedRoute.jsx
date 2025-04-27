import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

    let user = useSelector(st => st.user.currentUser)
    return (<>
        {user?.role != "Admin" ? <Navigate to="/home" /> : children}
    </>)
}

export default ProtectedRoute;
