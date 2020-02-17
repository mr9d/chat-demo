const messages = [];

const addMessage = (name, message) => {
  messages.push({
    name: name,
    message: message,
    date: Date.now()
  });
};

const getLastMessages = (limit) => {
  return messages.slice(-limit);
};

const getLastMessagesSince = (since) => {
  const res = [];
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].date <= since) {
      break;
    }
    res.unshift(messages[i]);
  }
  return res;
};

export default { addMessage, getLastMessages, getLastMessagesSince };
