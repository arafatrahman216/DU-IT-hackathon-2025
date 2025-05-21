import { ThemeProvider, createTheme, GlobalStyles } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Profile from './pages/profile/Profile'; // Make sure this file exists
import LearningPage from './pages/LearningPage/LearningPage';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#009688', // Changed to Teal 500 for a more colorful primary
    },
    secondary: {
      main: '#f50057', // Existing vibrant pink
    },
    // You can add more palette colors if needed, e.g., for backgrounds
    background: {
      default: 'transparent', // To allow body gradient to show
      paper: 'rgba(255, 255, 255, 0.85)', // Default paper with some transparency
    }
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

const globalStyles = (
  <GlobalStyles
    styles={{
      body: {
        margin: 0,
        padding: 0,
        minHeight: '100vh',
        background: 'linear-gradient(120deg, #a8edea 0%, #fed6e3 100%)', // Light teal to light pink gradient
        backgroundAttachment: 'fixed', // Keeps gradient fixed during scroll
      },
      '#root': { // Ensure the root div also takes full height
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }
    }}
  />
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      {globalStyles} {/* Apply global styles */}
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/learning" element={<LearningPage />} /> {/* Add this line for the learning page */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
