import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import send from '../../components/messages/messages';

let messages = [];
let messageKeys = [];
let likes = [];
let likeKeys = [];

const returnData = (data) => {
  const messageData = data.val();
  if (messageData !== null) {
    messages = Object.values(messageData);
    messageKeys = Object.keys(messageData);
    send.dataRecipient(messages, messageKeys);
  } else {
    messages = [];
    messageKeys = [];
    send.dataRecipient(messages, messageKeys);
  }
};

const returnLikes = (data) => {
  const likeData = data.val();
  if (likeData !== null) {
    likes = Object.values(likeData);
    likeKeys = Object.keys(likeData);
    send.updateLikeCount(likes, likeKeys);
  }
};

const returnError = (error) => {
  console.error(error);
};

const loadMessageData = () => {
  firebase.database().ref('messages').on('value', returnData, returnError);
  firebase.database().ref('likes').on('value', returnLikes, returnError);
};

export default { loadMessageData };
