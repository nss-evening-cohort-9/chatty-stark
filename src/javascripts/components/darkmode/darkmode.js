function darkTheme() {
  document.querySelector('.dark-mode, .dark-m-body').style = 'background-color: #303030 !important; color: white; border:none';
  document.querySelector('.dark-nav').style = 'background-color: #505050 !important; color: white; border:none';
  document.querySelector('.dark-m-header').style = 'background-color: #505050 !important; color: white; border:none; border-radius: 0px;';
  document.querySelector('.dark-m-body').style = 'background-color: #303030 !important; color: white; border:none';
  document.querySelector('.dark-footer').style = 'background-color: #505050 !important; color: white; border:none;border-radius: 0px';
  document.querySelector('.btn-dark').style = 'color: white !important;';
}

function lightTheme() {
  document.querySelector('.dark-mode').style = '';
  document.querySelector('.dark-nav').style = '';
  document.querySelector('.dark-m-header').style = '';
  document.querySelector('.dark-m-body').style = '';
  document.querySelector('.dark-footer').style = '';
  document.querySelector('.btn-dark').style = '';
}

const themeButtons = () => {
  const darkButton = document.getElementById('dark-btn');
  const lightButton = document.getElementById('light-btn');

  darkButton.addEventListener('click', darkTheme);
  lightButton.addEventListener('click', lightTheme);
};

export default { themeButtons };
