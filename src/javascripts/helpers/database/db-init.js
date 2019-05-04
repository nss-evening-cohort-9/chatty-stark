import firebase from 'firebase';

const firebaseSetup = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyAfyngNpZ-V2hqpUbmX58H-qBK1y3HDno4',
    authDomain: 'small-talk-e0b34.firebaseapp.com',
    databaseURL: 'https://small-talk-e0b34.firebaseio.com',
    projectId: 'small-talk-e0b34',
    storageBucket: 'small-talk-e0b34.appspot.com',
    messagingSenderId: '374389060711',
  };
  firebase.initializeApp(firebaseConfig);
};

export default { firebaseSetup };
