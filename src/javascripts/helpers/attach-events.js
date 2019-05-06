import messages from '../components/messages/messages';

const attachEvents = () => {
  document.getElementById('messages').addEventListener('click', messages.deleteMessage);
  document.getElementById('messages').addEventListener('click', messages.addLikesOrRemove);
  document.getElementById('message-form').addEventListener('submit', messages.errorCheck);
  document.getElementById('clear-messages').addEventListener('click', messages.clearMessages);
  document.getElementById('sign-in').addEventListener('click', messages.setUser);
};

export default { attachEvents };
