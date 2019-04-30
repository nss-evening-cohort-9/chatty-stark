import moment from 'moment';

import data from '../helpers/data';
import util from '../helpers/util';
import bot from './chatbot';

let messages = [];

const addTimeStamp = () => {
  const time = moment().format('LT');
  return time;
};
addTimeStamp();

const domStringBuilder = (array) => {
  let domString = '';
  array.forEach((item) => {
    domString += `<div class="message-box" id=${item.id}>`;
    domString += '  <div class="message-heading d-flex align-items-center">';
    domString += `    <img height="25" width="25" src=${item.imageUrl} class="pic">`;
    domString += `    <div class="msg-name">${item.userName}</div>`;
    domString += `    <div class="time" id="time">${item.timeStamp}</div>`;
    domString += `    <i id="delete" class="${item.id} fas fa-trash-alt"></i>`;
    domString += '  </div>';
    domString += '  <div class="message-body">';
    domString += `    <div>${item.msg}</div>`;
    domString += '  </div>';
    domString += '</div>';
  });
  util.printToDom('messages', domString);
};

const addMessage = (event) => {
  event.preventDefault();
  let counter = 6;

  const newMessageInput = document.getElementById('new-message');
  const newMessage = {
    id: `message${counter}`,
    imageUrl: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/04/15/08/jon-snow-got.jpg',
    userName: 'Jon Snow',
    timeStamp: addTimeStamp(),
    msg: newMessageInput.value,
  };
  messages.push(newMessage);
  domStringBuilder(messages);
  counter += 1;

  if (bot.aliasCheck()) {
    messages.push(bot.getBotResponse());
    const msgWithTime = [];
    messages.forEach((msg) => {
      const msgCopy = msg;
      msgCopy.timeStamp = addTimeStamp();
      msgWithTime.push(msgCopy);
    });
    messages = msgWithTime;
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
