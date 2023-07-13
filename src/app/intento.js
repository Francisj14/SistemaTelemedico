
// Configura la información de tu proyecto Firebase
var firebaseConfig = {
    apiKey: 'AIzaSyDyn4K81U4SlxOhoMoeij75zbT3gVcm5eU',
    databaseURL: 'https://database-78d55-default-rtdb.firebaseio.com',
    authDomain: 'database-78d55.firebaseapp.com',
    projectId: 'database-78d55',
    storageBucket: 'database-78d55.appspot.com',
    messagingSenderId: '807241224956',
    appId: '1:807241224956:web:ace64e8d87a273dde63d79',
};

  

  // Inicializa Firebase
  firebase.initializeApp(firebaseConfig);


  var db = firebase.firestore();

// Ejemplo de lectura de datos desde Firestore
db.collection("personaldata/").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
});