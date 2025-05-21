
import supabase from '../config/supabase.js';
import { generateToken } from '../utils/JwtToken.js';

export const login = async (req, res) => {
  try {
    console.log('Login request:', req.body);
    const { email, password } = req.body;
    

    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide email and password'
      });
    }

    // Get user from Supabase
    const { data: user, error } = await supabase
      .from('User')
      .select('*')
      .eq('email', email)
      .eq('password', password) // Check password in DB query
      .single();
    console.log('Supabase user data:', user);

    if (error || !user) {
      return res.status(401).json({
      status: 'error',
      message: 'Invalid email or password'
      });
    }

    // Remove password from user object before sending
    delete user.password;

    // Create session token
    const token = generateToken(user.id);

    res.status(200).json({
      status: 'success',
      data: {
        user,
        token
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred during login'
    });
  }
};

