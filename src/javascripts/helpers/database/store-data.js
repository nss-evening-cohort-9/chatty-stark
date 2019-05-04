import firebase from 'firebase';

const addData = (msg) => {
  firebase.database().ref('messages').push(msg);
};

const likeData = (key, likeVal) => {
  firebase.database().ref(`messages/${key}/likeCount`).set(likeVal);
};

const overwriteData = () => {
  const message = {};
  firebase.database().ref('messages').set(message);
};

const removeData = (key) => {
  firebase.database().ref(`messages/${key}`).remove();
};

export default {
  addData,
  overwriteData,
  removeData,
  likeData,
};
