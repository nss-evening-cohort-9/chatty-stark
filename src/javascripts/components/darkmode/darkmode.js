// function darkTheme() {
//   document.querySelector('.dark-mode, .dark-m-body').style =
//  'background-color: #303030 !important; color: white; border:none';
//   document.querySelector('.dark-nav').style =
//  'background-color: #505050 !important; color: white; border:none';
//   document.querySelector('.dark-menu').style =
//  'background-color: #808080 !important; color: white; border:none';
//   document.querySelector('.dropdown-item').style =
//   'background-color: #505050 !important; color: white; border:none';
//   document.querySelector('.dark-m-header').style =
//  'background-color: #505050 !important; color: white; border:none; border-radius: 0px;';
//   document.querySelector('.dark-m-body').style =
//   'background-color: #303030 !important; color: white; border:none';
//   document.querySelector('.dark-footer').style =
//   'background-color: #505050 !important; color: white; border:none;border-radius: 0px';
//   document.querySelector('.btn-dark').style = 'color: black !important;';
//   document.querySelector('.btn1').style = 'color: black !important;';
//   document.querySelector('.btn2').style = 'color: black !important;';
//   document.querySelector('.friends-dark').style =
//   'background-color: #252525 !important; color: white;';
// }

// function lightTheme() {
//   document.querySelector('.dark-mode').style = '';
//   document.querySelector('.dark-menu').style = '';
//   document.querySelector('.dropdown-item').style = '';
//   document.querySelector('.dark-nav').style = '';
//   document.querySelector('.dark-m-header').style = '';
//   document.querySelector('.dark-m-body').style = '';
//   document.querySelector('.dark-footer').style = '';
//   document.querySelector('.btn-dark').style = 'color: black !important;';
//   document.querySelector('.friends-dark').style = 'background-color: #fff !important';
// }

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
