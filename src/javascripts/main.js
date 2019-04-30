import onLoad from './components/messages';
import friendslist from './components/friends/friends';
import themes from './components/darkmode/darkmode';
import events from './helpers/attach-events';
import bot from './components/chatbot';
import readability from './components/textsize/readability';

import 'bootstrap';
import '../styles/main.scss';

const init = () => {
  onLoad.getData();
  friendslist.getFriends();
  themes.themeButtons();
  readability.attachEvents();
  events.attachEvents();
  bot.getData();
};

init();
