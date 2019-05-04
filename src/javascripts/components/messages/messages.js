import moment from 'moment';

import store from '../../helpers/database/store-data';
import util from '../../helpers/util';
import bot from '../chatbot';

let messages = [];
const addTimeStamp = () => {
  const time = moment().format('LT');
  return time;
};

const domStringBuilder = (array, keys) => {
  let counter = 0;
  let domString = '';
  array.forEach((item) => {
    domString += `<div class="message shadow-sm" id=${keys[counter]}>`;
    domString += '  <div class="message-heading d-flex align-items-center">';
    domString += `    <img height="25" width="25" src=${item.imageUrl} class="pic">`;
    domString += `    <div class="msg-name">${item.userName}</div>`;
    domString += `    <div class="time" id="time">${item.timeStamp}</div>`;
    domString += `    <i id="delete" class="${keys[counter]} fas fa-trash-alt"></i>`;
    domString += '  </div>';
    domString += '  <div class="message-body">';
    domString += `    <div>${item.msg}</div>`;
    domString += '  </div>';
    domString += '  <div class="card-footer">Like & Dislike Goes here</div>';
    domString += '</div>';
    counter += 1;
  });
  util.printToDom('messages', domString);
};

const print = () => {
  domStringBuilder(messages);
};

const addMessage = (inputValue) => {
  const newMessage = {
    imageUrl: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/04/15/08/jon-snow-got.jpg',
    userName: 'Jon Snow',
    timeStamp: addTimeStamp(),
    msg: inputValue,
  };

  // counter += 1;
  // messages.push(newMessage);
  store.addData(newMessage);

  // if (messages.length > 20) {
  // const tempMsg = messages.slice(1);
  // messages = tempMsg;
  //   store.overwriteData(tempMsg);
  //   print();
  // } else {
  //   print();
  // }

  if (bot.aliasCheck()) {
    const botMessage = bot.getBotResponse();
    botMessage.timeStamp = addTimeStamp();
    // messages.push(botMessage);
    store.addData(botMessage);

    if (messages.length > 20) {
      const tempMsg = messages.slice(1);
      // messages = tempMsg;
      store.overwriteData(tempMsg);
      print();
    } else {
      print();
    }
  }
  document.getElementById('new-message').value = '';
};

const errorCheck = (event) => {
  event.preventDefault();
  const inputValue = document.getElementById('new-message').value;
  if (inputValue !== '') {
    addMessage(inputValue);
  }
};

const clearMessages = () => {
  messages = [];
  store.overwriteData(messages);
  print();
};

const deleteMessage = (event) => {
  if (event.target.id === 'delete') {
    const criteria = event.target.classList[0];
    store.removeData(criteria);
  }
};

const dataRecipient = (array, keys) => {
  domStringBuilder(array, keys);
};

export default {
  print,
  domStringBuilder,
  addMessage,
  deleteMessage,
  clearMessages,
  errorCheck,
  dataRecipient,
};
