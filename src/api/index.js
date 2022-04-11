const express = require('express');


const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

const auth = require('./auth/auth.routes');
router.use('/auth', auth);

const users = require('./users/users.routes');
router.use('/users', users);


module.exports = router;
