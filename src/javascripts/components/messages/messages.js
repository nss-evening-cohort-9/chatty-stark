import moment from 'moment';

import store from '../../helpers/database/store-data';
import util from '../../helpers/util';
import bot from '../chatbot';


let messages = [];
let messageKeys = [];

const addTimeStamp = () => {
  const time = moment().format('LT');
  return time;
};

const addLikesOrRemove = (event) => {
  const actionClass = event.target.classList[0];
  const reference = event.target.classList[1];
  const likeCount = document.getElementById(`like${reference}`);

  if (actionClass === 'like') {
    let likeCountValue = Number(likeCount.innerHTML);
    likeCountValue += 1;
    console.error(likeCountValue);
    store.likeData(reference, likeCountValue);
  } else if (actionClass === 'dislike') {
    let likeCountValue = Number(likeCount.innerHTML);
    likeCountValue -= 1;
    store.likeData(reference, likeCountValue);
  }
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
    domString += '  <div class="card-footer">';
    domString += `    <i class="dislike ${keys[counter]} fas fa-thumbs-down"> </i>`;
    domString += `    <p id="like${keys[counter]}">${item.likeCount}</p>`;
    domString += `    <i class="like ${keys[counter]} fas fa-thumbs-up"></i>`;
    domString += '  </div>';
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
    likeCount: 0,
    msg: inputValue,
  };

  store.addData(newMessage);

  if (messages.length > 20) {
    store.removeData(messageKeys[0]);
  }

  if (bot.aliasCheck()) {
    const botMessage = bot.getBotResponse();
    botMessage.timeStamp = addTimeStamp();
    store.addData(botMessage);

    if (messages.length > 20) {
      store.removeData(messageKeys[0]);
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
  store.overwriteData();
};

const deleteMessage = (event) => {
  if (event.target.id === 'delete') {
    const criteria = event.target.classList[0];
    store.removeData(criteria);
  }
};

const dataRecipient = (array, keys) => {
  messages = array;
  messageKeys = keys;
  domStringBuilder(messages, messageKeys);
};

export default {
  print,
  domStringBuilder,
  addMessage,
  deleteMessage,
  clearMessages,
  errorCheck,
  dataRecipient,
  addLikesOrRemove,
};
