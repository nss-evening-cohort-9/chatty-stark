const darkTheme = () => {
  document.getElementById('dark').classList.add('dark-mode');
  document.getElementById('messages').classList.add('dark-mode');
  document.getElementById('friends').classList.add('dark-mode');
};

const lightTheme = () => {
  document.getElementById('dark').classList.remove('dark-mode');
  document.getElementById('messages').classList.remove('dark-mode');
  document.getElementById('friends').classList.remove('dark-mode');
};

const themeButtons = () => {
  const darkButton = document.getElementById('dark-btn');
  const lightButton = document.getElementById('light-btn');

  darkButton.addEventListener('click', darkTheme);
  lightButton.addEventListener('click', lightTheme);
};

export default { themeButtons };
