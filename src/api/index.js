const express = require('express');


const router = express.Router();

const auth = require('./auth/auth.routes');
router.use('/auth', auth);

const sms = require('./sms/sms.routes');
router.use('/sms', sms);


module.exports = router;
