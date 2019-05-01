import firebase from 'firebase';

const addData = (msg) => {
  firebase.database().ref('messages').push(msg);
};

const overwriteData = (array) => {
  firebase.database().ref('messages').set('');
  array.forEach((item) => {
    firebase.database().ref('messages').push(item);
  });
};

export default { addData, overwriteData };
