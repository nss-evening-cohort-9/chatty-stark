import firebase from 'firebase';

let messages = [];

const returnData = (data) => {
  const messageData = data.val();
  const dbMessages = Object.values(messageData);
  messages = dbMessages;
  console.error(messageData);
};

const returnError = (error) => {
  console.error(error);
};

const getData = () => {
  firebase.database().ref('messages').on('value', returnData, returnError);
  return messages;
};

export default { getData };
