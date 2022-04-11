const { db } = require('../../utils/db');

function createMessage(attrs) {
  return db.message.create({
    data: attrs,
  });
}

function findAllMessages() {
  return db.message.findMany();
}

async function findUnreadMessages(lastId) {
  let lastMessage = await findMessageById(lastId);
  let cons = { msgType: 'inbound' };

  if (lastMessage) {
    cons.createdAt = { gt: lastMessage.createdAt };
  }

  return db.message.findMany({
    where: cons
  });
}

function findMessageById(id) {
  return db.message.findUnique({
    where: {
      id,
    },
  });
}

function mapUnreadMessages(messages) {
  return messages.map( m => {
    return {
      sms_id: m.id,
      sending_date: m.createdAt,
      sender: m.sender,
      sms_text: m.msg
    };
  });
}

module.exports = {
  createMessage,
  findAllMessages,
  findUnreadMessages,
  findMessageById,
  mapUnreadMessages
};
