const largeText = () => {
  document.querySelector('.readability').style = 'font-size: 26px;';
};
const standardText = () => {
  document.querySelector('.readability').style = '';
};
const attachEvents = () => {
  document.getElementById('large-text').addEventListener('click', largeText);
  document.getElementById('standard-text').addEventListener('click', standardText);
};

export default { attachEvents };
