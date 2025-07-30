const jwt = require('jsonwebtoken');
const User = require('../models/User');

function verify(allowedRoles = []) {
  return async function (req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Invalid token' });
      
      try {
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) return res.status(401).json({ message: 'User not found' });
        
        req.user = {
          id: user._id,
          role: user.role,
          name: user.name,
          phone: user.phone
        };

        if (allowedRoles.length && !allowedRoles.includes(user.role)) {
          return res.status(403).json({ message: 'Access denied' });
        }

        next();
      } catch (error) {
        return res.status(500).json({ message: 'Server error' });
      }
    });
  };
}

module.exports = { verify };
