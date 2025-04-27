import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { httpCheckUser } from "../api/userServise";
import { userIn } from "../features/userSlice";
import { 
  Box, TextField, Button, Typography, Paper, IconButton, InputAdornment 
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import '../style/Login.css'; 

const Login = ({ closeDrawer, switchToSignUp }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function login(data) {
    httpCheckUser(data)
      .then(res => {
        if (closeDrawer) closeDrawer();
        navigate("/home");
        dispatch(userIn(res.data));
      })
      .catch(err => {
        setMessage(err.response.data.message);
      });
  }

  return (
    <Box className="login-container">
      <Paper elevation={3} className="login-paper">
        <Typography variant="h5" className="login-title">Login</Typography>

        {message && (
          <Typography className="login-message" variant="body2" gutterBottom>
            {message}
          </Typography>
        )}

        <form onSubmit={handleSubmit(login)}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            margin="normal"
            className="login-textfield"
            {...register("userName", { required: "Username is required" })}
            error={!!errors.userName}
            helperText={errors.userName?.message}
          />

          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            margin="normal"
            className="login-textfield"
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <Button type="submit" fullWidth variant="contained" color="primary" className="login-button">
            Login
          </Button>

          <Box className="login-footer">
            <Typography variant="body2">
              Don't have an account?
              <Button className="create-account-button" color="primary" onClick={switchToSignUp}>
                Create an account
              </Button>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
