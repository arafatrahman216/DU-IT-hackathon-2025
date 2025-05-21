import { ThemeProvider, createTheme } from '@mui/material';
import Login from './pages/auth/Login';
import './assets/styles/global.css';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#f50057',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Login />
    </ThemeProvider>
  );
}

export default App;
