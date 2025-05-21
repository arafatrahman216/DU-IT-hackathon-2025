import jwt from 'jsonwebtoken';

export const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};


export const verifyToken = (token) => {
    console.log('Verifying token:', token);
    
    return jwt.verify(token, process.env.JWT_SECRET);
};

export const decodeToken = (token) => {
    return jwt.decode(token);
};

