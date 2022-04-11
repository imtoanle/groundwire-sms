const bcrypt = require('bcrypt');
const {
  findUserByEmail
} = require('./api/users/users.services');

function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

/* eslint-disable no-unused-vars */

function errorHandler(err, req, res, next) {
  /* eslint-enable no-unused-vars */
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  });
}

async function isAuthenticated(req, res, next) {
  try {
    const { email, password, ...payload } = req.body;
    console.log(`email = ${email}, password = ${password}`);
    console.log(req.body);
    if (!email || !password) {
      throw new Error('You must provide an email and a password.');
    }

    const existingUser = await findUserByEmail(email);

    if (!existingUser) {
      throw new Error('Invalid login credentials.');
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      throw new Error('Invalid login credentials.');
    }

    req.currentUser = existingUser;
    req.payload = payload;
  } catch (err) {
    console.log(err);
    res.status(401);

    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? '🚫' : err.stack
    });
  }

  return next();
}

module.exports = {
  notFound,
  errorHandler,
  isAuthenticated
};
