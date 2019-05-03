import firebase from 'firebase';

const addData = (msg) => {
  firebase.database().ref('messages').push(msg);
};

const overwriteData = () => {
  let message = {};
  firebase.database().ref('messages').set(message);
};

const removeData = (key) => {
  firebase.database().ref(`messages/${key}`).remove();
};

export default { addData, overwriteData, removeData };
