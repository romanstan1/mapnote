import config from './firebase-config.js'
import firebase from 'firebase'

firebase.initializeApp(config);

const database = firebase.database();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const persistance = firebase.auth.Auth.Persistence

export {database, auth, provider, persistance}
