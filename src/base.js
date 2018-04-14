import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAfT9LPRRBHWHmX6gA8oQEER9knbMpFnE0",
  authDomain: "r-taskey.firebaseapp.com",
  databaseURL: "https://r-taskey.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
