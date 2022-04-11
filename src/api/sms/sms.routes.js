const express = require('express');
const { isAuthenticated } = require('../../middlewares');
const { createMessage, findAllMessages, findMessageById, findUnreadMessages, mapUnreadMessages } = require('./sms.services');

const router = express.Router();

router.post('/fetch', isAuthenticated, async (req, res, next) => {
  try {
    let { lastId } = req.payload;
    let unreadMessages = await findUnreadMessages(lastId);

    let data = {
      "unread_smss": mapUnreadMessages(unreadMessages),
      "sent_smss": []
    };
    res.json(data);
  } catch (err) {
    next(err);
    console.log(err);
  }
});

router.post('/inbound', isAuthenticated, async (req, res, next) => {
  try {
    const { sender, msg } = req.payload;

    const message = await createMessage({
      userId: req.currentUser.id,
      msgType: 'inbound',
      sender: sender,
      msg: msg
    });

    res.json(message);
  } catch (err) {
    next(err);
    console.log(err);
  }
});

router.post('/list', isAuthenticated, async (req, res, next) => {
  try {
    const messages = await findAllMessages();
    res.json(messages);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
