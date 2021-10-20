const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/User');

// @desc    Register User
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Create user
  const user = await User.create({
    name,
    email,
    password,
  });

  // Create token
  const token = user.getJwtToken();

  res.status(200).json({
    success: true,
    token,
  });
});

// @desc    Login User
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Please provide an email and password' });
  }

  const user = await User.findOne({ email }).select('+password');
  // Validate User
  if (!user) {
    return res.status(401).json({ success: false, error: 'Invalid credentials' });
  }

  const isValidated = await user.validatePassword(password);
  // Validate password
  if (!isValidated) {
    return res.status(401).json({ success: false, error: 'Invalid credentials' });
  }

  const token = user.getJwtToken();

  res.status(200).json({ success: true, token });
});
