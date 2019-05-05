import moment from 'moment';
import $ from 'jquery';

import store from '../../helpers/database/store-data';
import util from '../../helpers/util';
import bot from '../chatbot';

window.jQuery = $;
window.$ = $;

let messages = [];
let messageKeys = [];
let username = '';
let profilepic = '';
const usernames = [
  {
    name: 'Jeressia',
    pic: 'https://ca.slack-edge.com/T03F2SDTJ-UFA4DSCNQ-81dc1a95924d-48',
  },
  {
    name: 'Lwam',
    pic: 'https://ca.slack-edge.com/T03F2SDTJ-UFS9Q7LJG-5f21f3636e7e-48',
  },
  {
    name: 'Samuel',
    pic: 'https://ca.slack-edge.com/T03F2SDTJ-UFA8UFS5A-4a27698cb6cf-48',
  },
  {
    name: 'Silvestre',
    pic: 'https://ca.slack-edge.com/T03F2SDTJ-UFS5WJW68-97c4e988b6cf-48',
  },
];

const signOut = () => {
  username = '';
  profilepic = '';
  document.getElementById('sign-in').innerHTML = '<a id="signin-link" class="nav-link" href="#">Sign In</a>';
};

const getUserInfo = (event) => {
  event.preventDefault();
  const input = document.getElementById('signin-input');
  let found = false;
  usernames.forEach((user) => {
    if (input.value === user.name) {
      username = user.name;
      profilepic = user.pic;
      found = true;
    }

    if (found) {
      document.getElementById('sign-in').innerHTML = '<a id="signout" class="nav-link" href="#">Sign Out</a>';
      document.getElementById('signout').addEventListener('click', signOut);
    } else {
      $('#signin-input').tooltip('show');
    }
  });
};

const setUser = (event) => {
  $('#signin-input').tooltip('hide');
  if (event.target.id === 'signin-link') {
    let signIn = '<form id="signin-form">';
    signIn += '<input id="signin-input" type="input" placeholder="type your name" autocomplete="off"';
    signIn += 'data-toggle="tooltip" data-placement="bottom" title="That user does not exist, please try again.">';
    signIn += '</form>';
    document.getElementById('sign-in').innerHTML = signIn;
    document.getElementById('signin-form').addEventListener('submit', getUserInfo);
  }
};

const gotoBottom = (elementId) => {
  const element = document.getElementById(elementId);
  element.scrollTop = element.scrollHeight - element.clientHeight;
};

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
  gotoBottom('messages');
};

const print = () => {
  domStringBuilder(messages);
};

const addMessage = (inputValue) => {
  const newMessage = {
    imageUrl: profilepic,
    userName: username,
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
  if (inputValue !== '' && username !== '') {
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
  setUser,
};
