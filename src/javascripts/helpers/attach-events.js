import messages from '../components/messages';

const attachEvents = () => {
  document.getElementById('messages').addEventListener('click', messages.deleteMessage);
  document.getElementById('message-form').addEventListener('submit', messages.addMessage);
};

export default { attachEvents };
