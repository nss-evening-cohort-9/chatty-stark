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

const addLikesOrRemove = (event) => {
  console.error('test');
  const actionClass = event.target.classList[0];
  const reference = event.target.classList[1];
  const likeCount = document.getElementById(reference);

  if (actionClass === 'like') {
    let likeCoutValue = Number(likeCount.innerHTML);
    likeCoutValue += 1;
    likeCount.innerHTML = likeCoutValue;
    console.error(likeCount);
  } else if (actionClass === 'dislike') {
    let likeCoutValue = Number(likeCount.innerHTML);
    likeCoutValue -= 1;
    likeCount.innerHTML = likeCoutValue;
  }
};

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
    domString += '  <div class="card-footer">';
    domString += `    <i class="dislike like${item.id} fas fa-thumbs-down"> </i>`;
    domString += `    <p id="like${item.id}">0</p>`;
    domString += `    <i class="like like${item.id} fas fa-thumbs-up"></i>`;
    domString += '  </div>';
    domString += '</div>';
  });
  util.printToDom('messages', domString);
};

const addMessage = (inputValue) => {
  const newMessage = {
    id: `message${counter}`,
    imageUrl: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/04/15/08/jon-snow-got.jpg',
    userName: 'Jon Snow',
    timeStamp: addTimeStamp(),
    msg: inputValue,
  };

  counter += 1;
  messages.push(newMessage);

  if (messages.length > 20) {
    const tempMsg = messages.slice(1);
    messages = tempMsg;
    domStringBuilder(messages);
  } else {
    domStringBuilder(messages);
  }

  if (bot.aliasCheck()) {
    const botMessage = bot.getBotResponse();
    botMessage.id = `message${counter}`;
    botMessage.timeStamp = addTimeStamp();
    messages.push(botMessage);
    counter += 1;

    if (messages.length > 20) {
      const tempMsg = messages.slice(1);
      messages = tempMsg;
      domStringBuilder(messages);
    } else {
      domStringBuilder(messages);
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

export default {
  domStringBuilder,
  getData,
  addMessage,
  deleteMessage,
  clearMessages,
  errorCheck,
  addLikesOrRemove,
};
