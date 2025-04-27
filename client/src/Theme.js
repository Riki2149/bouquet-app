import { createTheme } from '@mui/material/styles';


const Theme = createTheme({
  palette: {
    primary: {
      main: '#000000', // ורוד עיקרי
      light: '#f8bbd0', // ורוד בהיר
      dark: '#d81b60', // ורוד כהה
      contrastText: '#fff', // טקסט לבן
    },
    secondary: {
      main: '#ec407a', // ורוד בהיר יותר
      light: '#f48fb1', // ורוד עוד יותר בהיר
      dark: '#c2185b', // ורוד כהה יותר
      contrastText: '#fff', // טקסט לבן
    },
    error: {
      main: '#f44336', // אדום
    },
    background: {
      default: '#f9f9f9', // רקע בהיר
      paper: '#ffffff', // נייר לבן
    },
  },
  typography: {
    fontFamily: "'Assistant', 'Roboto', 'Heebo', sans-serif",
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          textTransform: 'none',
          fontWeight: 'bold',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          overflow: 'hidden',
        },
      },
    },
  },
});

export default Theme