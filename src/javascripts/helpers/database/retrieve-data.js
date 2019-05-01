import firebase from 'firebase';

const returnData = (data) => {
  const messageData = data.val();
  const messages = Object.values(messageData);
  console.error(messages);
};

const returnError = (error) => {
  console.error(error);
};

const getData = () => {
  firebase.database().ref('message').on('value', returnData, returnError);
};

export default { getData };
