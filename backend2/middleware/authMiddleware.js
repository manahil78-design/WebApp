
const jwt = require('jsonwebtoken');

const protectAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check whether the token was provided
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Access denied. Please log in.',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Only allow admin accounts
    if (decoded.role !== 'admin') {
      return res.status(403).json({
        message: 'Admin access only.',
      });
    }

    req.admin = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid or expired token.',
    });
  }
};

module.exports = protectAdmin;
