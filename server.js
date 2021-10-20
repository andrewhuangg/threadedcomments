const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/connectDb');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
// * Must be called under config to have access to env variables
connectDB();

// Route files
const comments = require('./routes/comments');
const posts = require('./routes/posts');

const app = express();

// Body parser
app.use(express.json());

// Middleware
// logger
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Mount routers
app.use('/api/v1/comments', comments);
app.use('/api/v1/posts', posts);

const PORT = process.env.PORT || 5000;

// Assign connection to variable and close if any errors are encountered
const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green.underline)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Unhanded Rejection Error: ${err.message}`.red.bold);
  // Close server and exit process (1 === failure)
  server.close(() => process.exit(1));
});
