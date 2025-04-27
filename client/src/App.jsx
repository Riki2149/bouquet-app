import { useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import AppRoutes from './components/AppRoutes';
import { ThemeProvider } from '@mui/material/styles';
import Theme from './Theme';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { userIn } from './features/userSlice';

function App() {

  let dispatch = useDispatch();
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      dispatch(userIn(JSON.parse(savedUser)))
    }
  }, []);

  return (
    <>
      <ThemeProvider theme={Theme}>
        <NavBar />
        <AppRoutes />
      </ThemeProvider>
    </>
  );
}

export default App;
