const jwt = require('jsonwebtoken');
const asyncHandler = require('./asyncHandler');
const User = require('../models/User');

// Authenticate route
exports.authenticate = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Validate token;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, error: 'You are not authorized to access this route' });
  }

  // Verify Token;
  try {
    //  * decoded has an id property which is the actual users id when logging in.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // * req.user will always be the logged in user.
    req.user = await User.findById(decoded.id);

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, error: 'You are not authorized to access this route' });
  }
});
