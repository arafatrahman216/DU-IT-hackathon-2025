import supabase from '../config/supabase.js';
import { verifyToken } from '../utils/JwtToken.js';

export const updateProfile = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'No token provided'
      });
    }

    const decoded = verifyToken(token);
    const userId = decoded.userId;
    console.log(userId);
    const {
      name,
      username,
      email,
      password,
      profile,
      role,
      created_at,
      status
    } = req.body;

    // Update user profile in Supabase
    const { data: updatedUser, error } = await supabase
      .from('User')
      .update({
        name,
        username,
        email,
        password,
        profile,
        role,
        created_at,
        status
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      console.error('Profile update error:', error);
      return res.status(400).json({
        status: 'error',
        message: 'Failed to update profile'
      });
    }

    // Remove sensitive data
    delete updatedUser.password;

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser
      }
    });

  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while updating the profile'
    });
  }
};

export const getFullProfile = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'No token provided'
      });
    }

    const decoded = verifyToken(token);
    const userId = decoded.userId;
    console.log(userId);


    // Fetch complete user profile from Supabase
    const { data: user, error } = await supabase
      .from('User')
      .select(`
        id,
        email,
        name,
        username,
        role,
        status,
        created_at
      `)
      .eq('id', userId)
      .single();

    if (error || !user) {
      return res.status(404).json({
        status: 'error',
        message: 'User profile not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });

  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while fetching the profile'
    });
  }
}; 

export const getProfile = async (req, res) => {
  try {
    const token = req.headers.authorization ;
    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'No token provided'
      });
    }

    const decoded = verifyToken(token);
    const userId = decoded.userId;
    console.log(userId);

    const { data: user, error } = await supabase
      .from('User')
      .select('email, name, username, role, status, created_at,education')
      .eq('id', userId).single();

    console.log(user);

    if (error || !user) {
      return res.status(404).json({
        status: 'error',
        message: 'User profile not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        user
      } 
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while fetching the profile'
    });
  }
};