import onLoad from './components/messages';
import themes from './components/darkmode/darkmode';

import 'bootstrap';
import '../styles/main.scss';

const init = () => {
  onLoad.getData();
  themes.themeButtons();
};

init();
