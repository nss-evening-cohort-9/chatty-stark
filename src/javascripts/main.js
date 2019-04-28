import onLoad from './components/messages';
import events from './helpers/attach-events';

import 'bootstrap';
import '../styles/main.scss';

const init = () => {
  onLoad.getData();
  events.attachEvents();
};

init();
