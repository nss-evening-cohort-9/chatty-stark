import messages from '../components/messages';

const attachEvents = () => {
  document.getElementById('messages').addEventListener('click', messages.deleteMessage);
};

export default { attachEvents };
