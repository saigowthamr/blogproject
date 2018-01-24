import * as firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyBQX4nvFZIxL_Iju_GbrPq7kogMM9MfwKU',
  authDomain: 'vuej-http.firebaseapp.com',
  databaseURL: 'https://vuej-http.firebaseio.com',
  projectId: 'vuej-http',
  storageBucket: 'vuej-http.appspot.com'
}

const fire = firebase.initializeApp(config)

export default fire

