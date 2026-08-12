import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getDatabase,
  ref,
  set,
  onValue
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


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
// MOT DE PASSE
// ==========================================

const MOT_DE_PASSE = "Mvbc85600@";


// ==========================================
// INITIALISATION FIREBASE
// ==========================================

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);


// ==========================================
// ÉLÉMENTS HTML
// ==========================================

const login = document.getElementById("login");

const admin = document.getElementById("admin");

const password = document.getElementById("password");

const loginButton = document.getElementById("loginButton");

const loginError = document.getElementById("loginError");

const logoutButton = document.getElementById("logoutButton");

const currentScene = document.getElementById("currentScene");


// ==========================================
// VÉRIFIER SI DÉJÀ CONNECTÉ
// ==========================================

if (sessionStorage.getItem("adminConnecte") === "true") {

  afficherAdmin();

}


// ==========================================
// BOUTON CONNEXION
// ==========================================

loginButton.addEventListener(
  "click",
  verifierMotDePasse
);


// ==========================================
// TOUCHE ENTRÉE
// ==========================================

password.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Enter") {

      verifierMotDePasse();

    }

  }
);


// ==========================================
// VÉRIFICATION DU MOT DE PASSE
// ==========================================

function verifierMotDePasse() {

  if (password.value === MOT_DE_PASSE) {

    sessionStorage.setItem(
      "adminConnecte",
      "true"
    );

    afficherAdmin();

    password.value = "";

    loginError.textContent = "";

  }

  else {

    loginError.textContent =
      "Mot de passe incorrect.";

    password.value = "";

  }

}


// ==========================================
// AFFICHER LA RÉGIE
// ==========================================

function afficherAdmin() {

  login.style.display = "none";

  admin.style.display = "block";

}


// ==========================================
// DÉCONNEXION
// ==========================================

logoutButton.addEventListener(
  "click",
  () => {

    sessionStorage.removeItem(
      "adminConnecte"
    );

    admin.style.display = "none";

    login.style.display = "flex";

  }
);


// ==========================================
// DIFFUSER UNE SCÈNE
// ==========================================

window.diffuser = function(scene) {

  set(
    ref(
      db,
      "diffusion"
    ),
    {
      scene: scene,
      timestamp: Date.now()
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
      "Erreur lors de la diffusion : " +
      error.message
    );

  });

};


// ==========================================
// AFFICHER LA SCÈNE ACTUELLE
// ==========================================

onValue(
  ref(
    db,
    "diffusion"
  ),
  (snapshot) => {

    const data = snapshot.val();

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
