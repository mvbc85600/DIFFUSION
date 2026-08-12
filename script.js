import { initializeApp }
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getDatabase,
  ref,
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
  appId: "1:674799570797:web:0d8b7a2a892f604eb7d464",
};


// ==========================================
// INITIALISATION
// ==========================================

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);


// ==========================================
// ÉLÉMENTS DE LA PAGE
// ==========================================

const video =
  document.getElementById("video");

const message =
  document.getElementById("message");


// ==========================================
// SCÈNE ACTUELLE
// ==========================================

const sceneRef =
  ref(db, "diffusion/scene");


onValue(sceneRef, (snapshot) => {

  const scene = snapshot.val();

  console.log("Nouvelle scène :", scene);


  if (!scene) {

    message.textContent =
      "Aucune scène diffusée";

    return;
  }


  // ========================================
  // VIDÉO 1
  // ========================================

  if (scene === "video1") {

    afficherVideo(
      "videos/video1.mp4"
    );

  }


  // ========================================
  // VIDÉO 2
  // ========================================

  else if (scene === "video2") {

    afficherVideo(
      "videos/video2.mp4"
    );

  }


  // ========================================
  // PHOTOS
  // ========================================

  else if (scene === "photos") {

    message.style.display = "flex";

    message.textContent =
      "🖼️ Galerie photos";

    video.style.display = "none";

  }

});


// ==========================================
// AFFICHER UNE VIDÉO
// ==========================================

function afficherVideo(source) {

  message.style.display = "none";

  video.style.display = "block";


  // Arrête la vidéo actuelle

  video.pause();


  // Change la source

  video.src = source;


  // Recommence depuis le début

  video.currentTime = 0;


  // Lance la vidéo

  video.play()
    .catch(error => {

      console.log(
        "Lecture automatique bloquée :",
        error
      );

    });

}
