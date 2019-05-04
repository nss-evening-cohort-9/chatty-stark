import firebase from 'firebase';
import send from '../../components/messages/messages';

let messages = [];
let messageKeys = [];

const returnData = (data) => {
  const messageData = data.val();
  if (messageData !== null) {
    messages = Object.values(messageData);
    messageKeys = Object.keys(messageData);
    send.dataRecipient(messages, messageKeys);
  } else {
    messages = [];
    messages = [];
    send.dataRecipient(messages, messageKeys);
  }
};

const returnError = (error) => {
  console.error(error);
};

const loadMessageData = () => {
  firebase.database().ref('messages').on('value', returnData, returnError);
  return messages;
};

export default { loadMessageData };
