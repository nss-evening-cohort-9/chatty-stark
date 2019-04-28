import messages from '../components/messages';
import chatbot from '../components/chatbot';

const attachEvents = () => {
  document.getElementById('messages').addEventListener('click', messages.deleteMessage);
  document.getElementById('message-form').addEventListener('submit', chatbot.aliasCheck);
};

export default { attachEvents };
