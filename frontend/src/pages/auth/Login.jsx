import { useState } from 'react';

import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Link,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  LockOutlined,
} from '@mui/icons-material';

const Login = () => {
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Login attempt with:', formData);
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Handle successful login here
      if (data.status === 'success') {
        console.log('Login successful:', data.data);
        // TODO: Save token and redirect user
      }
    } catch (error) {
      console.error('Login error:', error);
      // TODO: Show error message to user
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.2)',
      }}
    >
      <Container 
        maxWidth={false}
        sx={{
          display: 'flex', 
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          width: '100%',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '500px',
            p: { xs: 3, sm: 4 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 3,
            backdropFilter: 'blur(16px)',
            backgroundColor: 'rgba(23, 25, 35, 0.9)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            '& .MuiTextField-root': {
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.7)',
              },
              '& input': {
                color: 'rgba(255, 255, 255, 0.9)',
              },
            },
          }}
        >
          {/* Logo/Icon */}
          <Box
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '50%',
              p: 2,
              mb: 3,
              backdropFilter: 'blur(5px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <LockOutlined sx={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: 30 }} />
          </Box>

          {/* Title */}
          <Typography 
            component="h1" 
            variant="h4" 
            sx={{ 
              mb: 1, 
              fontWeight: '600',
              color: 'rgba(255, 255, 255, 0.95)',
              letterSpacing: '-0.5px',
            }}
          >
            LearnAI
          </Typography>
          <Typography 
            component="h2" 
            variant="body1" 
            sx={{ 
              mb: 4, 
              color: 'rgba(255, 255, 255, 0.6)',
              textAlign: 'center',
            }}
          >
            Sign in to your account
          </Typography>

          {/* Login Form */}
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={togglePasswordVisibility}
                      edge="end"
                      sx={{ color: 'rgba(255, 255, 255, 0.5)' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 4 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mb: 3,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: '600',
                backgroundColor: '#2563eb',
                color: 'white',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#1d4ed8',
                },
              }}
            >
              Sign In
            </Button>

            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                width: '100%',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: 2, sm: 1 },
                '& a': {
                  color: 'rgba(255, 255, 255, 0.6)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  transition: 'color 0.2s',
                  '&:hover': {
                    color: 'rgba(255, 255, 255, 0.95)',
                  },
                },
              }}
            >
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
              <Link href="#" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Login; 