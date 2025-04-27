import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { httpAddUser } from "../api/userServise";
import { userIn } from "../features/userSlice";
import { 
  Box, TextField, Button, Typography, Paper, IconButton, InputAdornment 
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import '../style/SignUp.css'; // ייבוא קובץ ה-CSS

const SignUp = ({ closeDrawer, switchToLogin }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function save(data) {
    httpAddUser(data)
      .then(res => {
        if (closeDrawer) closeDrawer();
        dispatch(userIn(res.data));
      })
      .catch(err => {
        setMessage(err.response.data.message);
      });
  }

  return (
    <Box className="signup-container">
      <Paper elevation={3} className="signup-paper">
        <Typography variant="h5" className="signup-title">Sign Up</Typography>

        {message && (
          <Typography className="signup-message" variant="body2" gutterBottom>
            {message}
          </Typography>
        )}

        <form onSubmit={handleSubmit(save)}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            margin="normal"
            className="signup-field"
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
            className="signup-field"
            {...register("password", { 
              required: "Password is required",
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message: "Password must be strong (uppercase, lowercase, number and special character)"
              }
            })}
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

          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            className="signup-field"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Email must be in the correct format"
              }
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <Button type="submit" fullWidth variant="contained" color="primary" className="signup-button">
            Sign Up
          </Button>

          <Box className="signup-switch-text">
            <Typography variant="body2">
              Already have an account?
              <Button color="primary" onClick={switchToLogin} className="signup-switch-button">
                Login
              </Button>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default SignUp;
