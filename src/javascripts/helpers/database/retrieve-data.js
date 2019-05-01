import firebase from 'firebase';

let messages = [];

const returnData = (data) => {
  const messageData = data.val();
  const dbMessages = Object.values(messageData);
  messages = dbMessages;
};

const returnError = (error) => {
  console.error(error);
};

const getData = () => {
  firebase.database().ref('messages').on('value', returnData, returnError);
  return messages;
};

const getSeedData = () => {
  firebase.database().ref('seed').on('value', returnData, returnError);
  return messages;
};

export default { getData, getSeedData };
