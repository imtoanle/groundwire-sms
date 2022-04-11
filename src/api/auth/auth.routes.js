const express = require('express');
const {
  findUserByEmail,
  createUserByEmailAndPassword,
} = require('../users/users.services');
const {
  addRefreshTokenToWhitelist,
  findRefreshTokenById,
  deleteRefreshToken,
  revokeTokens
} = require('./auth.services');
const { hashToken } = require('../../utils/hashToken');

const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error('You must provide an email and a password.');
    }

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      res.status(400);
      throw new Error('Email already in use.');
    }

    await createUserByEmailAndPassword({ email, password });

    res.json({
      status: true,
      message: `Success create new user ${email}.`
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
