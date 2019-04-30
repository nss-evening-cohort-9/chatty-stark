import messages from '../components/messages';

const attachEvents = () => {
  document.getElementById('messages').addEventListener('click', messages.deleteMessage);
  document.getElementById('message-form').addEventListener('submit', messages.addMessage);
  document.getElementById('clear-messages').addEventListener('click', messages.clearMessages);
};

export default { attachEvents };
