import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userOut } from "../features/userSlice";
import { removeAllCart } from "../features/cartSlice";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Container,
    Badge,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    useMediaQuery,
    useTheme
} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // New import for user icon
import { useState } from "react";
import "../style/NavBar.css";
import Login from "../pages/Login";
import AuthDrawer from "./AuthDrawer"

const NavBar = () => {
    const currentUser = useSelector(state => state.user.currentUser);
    const { totalItems } = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isAuthDrawerOpen, setIsAuthDrawerOpen] = useState(false);
    const openAuthDrawer = () => setIsAuthDrawerOpen(true);
    const closeAuthDrawer = () => setIsAuthDrawerOpen(false);

    const handleLogout = () => {
        dispatch(userOut());
        dispatch(removeAllCart());
        navigate("/home");
        if (isMobile) setDrawerOpen(false);
    };

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };


    const userSection = (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            color: 'white',
            fontFamily: "'Montserrat', sans-serif"
        }} className="welcome-section">
            <AccountCircleIcon
                sx={{
                    color: '#ff4081',
                    marginRight: '10px',
                    fontSize: '2rem'
                }}
            />
            <Typography
                variant="body1"
                sx={{
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                }}
                className="welcome-text"
            >
                {currentUser
                    ? `Hello, ${currentUser.userName}`
                    : "Hello, Guest"}
            </Typography>
        </Box>
    );

    const rightSection = (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            marginLeft: 'auto',
            color: 'white'
        }} className="right-section">
            <Button
                color="inherit"
                component={Link}
                to="home"
                className="nav-link"
                onClick={isMobile ? toggleDrawer(false) : undefined}
            >
                Home
            </Button>

            {currentUser && currentUser.role === "Admin" ? (
                <Button
                    color="inherit"
                    component={Link}
                    to="addOrUpdateFlower"
                    className="nav-link"
                    onClick={isMobile ? toggleDrawer(false) : undefined}
                >
                    Add Flower
                </Button>
            ) : (
                <Button
                    color="inherit"
                    component={Link}
                    to="cart"
                    className="nav-link"
                    onClick={isMobile ? toggleDrawer(false) : undefined}
                >
                    <Badge badgeContent={totalItems || 0} color="error" sx={{ ml: 1 }}>
                        <ShoppingCartIcon />
                    </Badge>
                </Button>
            )}

            {!currentUser ? (
                <Button
                    color="inherit"
                    onClick={openAuthDrawer}
                    className="login-button nav-link"
                >
                    Login
                </Button>
            ) : (
                <Button
                    color="inherit"
                    onClick={handleLogout}
                    className="logout-button nav-link"
                >
                    Logout
                </Button>
            )}
            <AuthDrawer
                open={isAuthDrawerOpen}
                onClose={closeAuthDrawer}
            />
        </Box>
    );

    const drawer = (
        <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
            PaperProps={{
                sx: {
                    backgroundColor: " #2a2a2a", 
                    color: "white",             
                    width: 250,
                },
            }}
        >
            <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
            >
                <List>
                    <ListItem>
                        <ListItemText
                            primary={currentUser ? `Hello, ${currentUser.userName}` : "Hello, Guest"}
                            sx={{ color: "white", fontWeight: 600 }}
                        />
                    </ListItem>

                    <ListItem button component={Link} to="home">
                        <ListItemText primary="Home" sx={{ color: "white" }} />
                    </ListItem>

                    {currentUser && currentUser.role === "Admin" ? (
                        <ListItem button component={Link} to="addOrUpdateFlower">
                            <ListItemText primary="Add Flower" sx={{ color: "white" }} />
                        </ListItem>
                    ) : (
                        <ListItem button component={Link} to="cart">
                            <ShoppingCartIcon sx={{ color: "white", marginRight: 1 }} />
                        </ListItem>
                    )}
                </List>
            </Box>
        </Drawer>
    );

    return (
        <AppBar
            position="fixed"
            className="navbar"
            sx={{
                backgroundColor: '#1a1a1a',
                fontFamily: "'Montserrat', sans-serif"
            }}
        >
            <Container maxWidth="lg">
                <Toolbar>
                    {isMobile ? (
                        <>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={toggleDrawer(true)}
                                className="menu-button"
                                sx={{ marginLeft: 'auto' }}
                            >
                                <MenuIcon />
                            </IconButton>

                            <Drawer
                                anchor="right"
                                open={drawerOpen}
                                onClose={toggleDrawer(false)}
                            >
                                {drawer}
                            </Drawer>
                        </>
                    ) :
                        (
                            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                </Box>
                                {userSection}
                                {rightSection}
                            </Box>
                        )
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default NavBar;
