import firebase from 'firebase';

const addData = (msg) => {
  firebase.database().ref('messages').push(msg);
};

const overwriteData = (array) => {
  const messages = {};
  firebase.database().ref('messages').push(messages);
  array.forEach((item) => {
    firebase.database().ref('messages').push(item);
  });
};

export default { addData, overwriteData };
