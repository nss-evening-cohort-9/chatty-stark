import onLoad from './components/messages';
import themes from './components/darkmode/darkmode';
import events from './helpers/attach-events';

import 'bootstrap';
import '../styles/main.scss';


const init = () => {
  onLoad.getData();
  themes.themeButtons();
  events.attachEvents();
};

init();
