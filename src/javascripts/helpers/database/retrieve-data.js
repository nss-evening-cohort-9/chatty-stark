import firebase from 'firebase';
import print from '../../components/messages/messages';

let messages = [];

const printToDom = (array) => {
  console.error(array);
  print.domStringBuilder(array);
};

const returnData = (data) => {
  const messageData = data.val();
  const dbMessages = Object.values(messageData);
  messages = dbMessages;
  printToDom(messages);
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
};

export default { getData, getSeedData };
