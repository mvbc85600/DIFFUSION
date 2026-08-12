import { initializeApp }
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";


import {

  getAuth,

  signInWithEmailAndPassword,

  onAuthStateChanged,

  signOut

} from
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


import {

  getDatabase,

  ref,

  set,

  onValue

} from
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";



// ==========================================
// CONFIGURATION FIREBASE
// ==========================================

const firebaseConfig = {

 apiKey: "AIzaSyAnwzIOCEgOMmuAHII9lujvq73Y81Fla00",
  authDomain: "diffusion-b9afa.firebaseapp.com",
  databaseURL: "https://diffusion-b9afa-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "diffusion-b9afa",
  storageBucket: "diffusion-b9afa.firebasestorage.app",
  messagingSenderId: "674799570797",
  appId: "1:674799570797:web:0d8b7a2a892f604eb7d464"

};



// ==========================================
// INITIALISATION
// ==========================================

const app =
  initializeApp(firebaseConfig);


const auth =
  getAuth(app);


const db =
  getDatabase(app);



// ==========================================
// ÉLÉMENTS HTML
// ==========================================

const login =
  document.getElementById("login");


const admin =
  document.getElementById("admin");


const email =
  document.getElementById("email");


const password =
  document.getElementById("password");


const loginButton =
  document.getElementById("loginButton");


const loginError =
  document.getElementById("loginError");


const logoutButton =
  document.getElementById("logoutButton");


const currentScene =
  document.getElementById("currentScene");



// ==========================================
// CONNEXION
// ==========================================

loginButton.addEventListener(
  "click",
  async () => {

    loginError.textContent = "";

    try {

      await signInWithEmailAndPassword(

        auth,

        email.value,

        password.value

      );

    }

    catch (error) {

      console.error(error);

      loginError.textContent =
        "Email ou mot de passe incorrect.";

    }

  }
);



// ==========================================
// ÉTAT DE CONNEXION
// ==========================================

onAuthStateChanged(
  auth,
  (user) => {

    if (user) {

      login.style.display = "none";

      admin.style.display = "block";

    }

    else {

      login.style.display = "flex";

      admin.style.display = "none";

    }

  }
);



// ==========================================
// DÉCONNEXION
// ==========================================

logoutButton.addEventListener(
  "click",
  async () => {

    await signOut(auth);

  }
);



// ==========================================
// DIFFUSER UNE SCÈNE
// ==========================================

window.diffuser =
  function(scene) {

    const diffusionRef =
      ref(db, "diffusion");


    set(
      diffusionRef,
      {

        scene: scene,

        timestamp:
          Date.now()

      }

    )

    .then(() => {

      console.log(
        "Scène diffusée :",
        scene
      );

    })

    .catch((error) => {

      console.error(error);

      alert(
        "Impossible de diffuser la scène."
      );

    });

  };



// ==========================================
// AFFICHER LA SCÈNE ACTUELLE
// ==========================================

const diffusionRef =
  ref(db, "diffusion");


onValue(
  diffusionRef,
  (snapshot) => {

    const data =
      snapshot.val();


    if (data && data.scene) {

      currentScene.textContent =
        data.scene;

    }

    else {

      currentScene.textContent =
        "Aucune";

    }

  }
);
