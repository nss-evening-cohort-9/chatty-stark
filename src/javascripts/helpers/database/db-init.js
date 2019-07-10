import firebase from 'firebase/app';
import fbref from './fbconfig.json';

const firebaseSetup = () => {
  firebase.initializeApp(fbref.firebaseConfig);
};

export default { firebaseSetup };
