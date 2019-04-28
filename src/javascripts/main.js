import onLoad from './components/messages';
import events from './helpers/attach-events';
import bot from './components/chatbot';

import 'bootstrap';
import '../styles/main.scss';

const init = () => {
  onLoad.getData();
  events.attachEvents();
  bot.getData();
};

init();
