import moment from 'moment';

import data from '../../helpers/data';
import util from '../../helpers/util';
import bot from '../chatbot';

let messages = [];
let counter = 6;

const addTimeStamp = () => {
  const time = moment().format('LT');
  return time;
};
addTimeStamp();

const domStringBuilder = (array) => {
  let domString = '';
  array.forEach((item) => {
    domString += `<div class="message shadow-sm" id=${item.id}>`;
    domString += '  <div class="message-heading d-flex align-items-center">';
    domString += `    <img height="25" width="25" src=${item.imageUrl} class="pic">`;
    domString += `    <div class="msg-name">${item.userName}</div>`;
    domString += `    <div class="time" id="time">${item.timeStamp}</div>`;
    domString += `    <i id="delete" class="${item.id} fas fa-trash-alt"></i>`;
    domString += '  </div>';
    domString += '  <div class="message-body">';
    domString += `    <div>${item.msg}</div>`;
    domString += '  </div>';
    domString += '  <div class="card-footer">Like & Dislike Goes here</div>';
    domString += '</div>';
  });
  util.printToDom('messages', domString);
};

const addMessage = (event) => {
  event.preventDefault();

  const newMessageInput = document.getElementById('new-message');
  const newMessage = {
    id: `message${counter}`,
    imageUrl: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/04/15/08/jon-snow-got.jpg',
    userName: 'Jon Snow',
    timeStamp: addTimeStamp(),
    msg: newMessageInput.value,
  };
  counter += 1;
  messages.push(newMessage);

  if (bot.aliasCheck()) {
    const botMessage = bot.getBotResponse();
    botMessage.id = `message${counter}`;
    botMessage.timeStamp = addTimeStamp();
    messages.push(botMessage);
    counter += 1;
  }
  domStringBuilder(messages);
  document.getElementById('new-message').value = '';
};

const clearMessages = () => {
  messages = [];
  domStringBuilder(messages);
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

function scrollToBottom() {
  document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
}

export default {
  domStringBuilder,
  getData,
  addMessage,
  deleteMessage,
  clearMessages,
  scrollToBottom,
};
