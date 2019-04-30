import onLoad from './components/messages';
import friendslist from './components/friends/friends';
import themes from './components/darkmode/darkmode';
import events from './helpers/attach-events';
import bot from './components/chatbot';

import 'bootstrap';
import '../styles/main.scss';

const init = () => {
  onLoad.getData();
  friendslist.getFriends();
  themes.themeButtons();
  events.attachEvents();
  bot.getData();
};

init();
