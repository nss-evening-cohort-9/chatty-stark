import data from '../helpers/data';
import util from '../helpers/util';
import bot from './chatbot';

let messages = [];


const domStringBuilder = (array) => {
  let domString = '';
  array.forEach((item) => {
    domString += `<div class="message" id=${item.id}>`;
    domString += '  <div class="message-heading d-flex align-items-center">';
    domString += `    <img height="25" width="25" src=${item.imageUrl}>`;
    domString += `    <div>${item.userName}</div>`;
    domString += '    <div>1:00</div>';
    domString += `    <i id="delete" class="${item.id} fas fa-trash-alt"></i>`;
    domString += '  </div>';
    domString += '  <div class="message-body">';
    domString += `    <div>${item.msg}</div>`;
    domString += '  </div>';
    domString += '</div>';
  });
  util.printToDom('messages', domString);
};

const addMessage = () => {
  if (bot.aliasCheck()) {
    messages.push(bot.getBotResponse());
    domStringBuilder(messages);
    document.getElementById('new-message').value = '';
  }
};

const deleteMessage = (event) => {
  if (event.target.id === 'delete') {
    const criteria = event.target.classList[0];
    const tempArray = messages.filter(message => message.id !== criteria);
    messages = tempArray;
    domStringBuilder(messages);
  }
};

const getData = () => {
  data.getMessagesData()
    .then((response) => {
      const messagesData = response.data.messages;
      messages = messagesData;
      domStringBuilder(messages);
    })
    .catch((error) => {
      console.error(error);
    });
};

export default {
  domStringBuilder,
  getData,
  addMessage,
  deleteMessage,
};
