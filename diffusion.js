import { initializeApp }
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";


import {

  getDatabase,

  ref,

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
// FIREBASE
// ==========================================

const app =
  initializeApp(firebaseConfig);


const db =
  getDatabase(app);



// ==========================================
// ÉLÉMENTS
// ==========================================

const video =
  document.getElementById("video");


const message =
  document.getElementById("message");


const slideshow =
  document.getElementById("slideshow");


const slideImage =
  document.getElementById("slideImage");



// ==========================================
// ÉTAT DU DIAPORAMA
// ==========================================

let slideTimer = null;


let currentSlide = 0;


const slides = [

  "photos/photo1.jpg",

  "photos/photo2.jpg",

  "photos/photo3.jpg"

];



// ==========================================
// ÉCOUTE FIREBASE
// ==========================================

const diffusionRef =
  ref(db, "diffusion");


onValue(

  diffusionRef,

  (snapshot) => {

    const data =
      snapshot.val();


    if (!data || !data.scene) {

      return;

    }


    console.log(
      "Nouvelle scène :",
      data.scene
    );


    afficherScene(
      data.scene
    );

  }

);



// ==========================================
// AFFICHER UNE SCÈNE
// ==========================================

function afficherScene(scene) {


  // Arrêter le diaporama

  arreterDiaporama();


  // Cacher tous les éléments

  video.style.display =
    "none";

  slideshow.style.display =
    "none";

  message.style.display =
    "none";


  // ========================================
  // VIDÉO 1
  // ========================================

  if (scene === "video1") {

    afficherVideo(
      "video/Défense.mp4"
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
  // VIDÉO 3
  // ========================================

  else if (scene === "video3") {

    afficherVideo(
      "videos/video3.mp4"
    );

  }


  // ========================================
  // VIDÉO 4
  // ========================================

  else if (scene === "video4") {

    afficherVideo(
      "videos/video4.mp4"
    );

  }


  // ========================================
  // VIDÉO 5
  // ========================================

  else if (scene === "video5") {

    afficherVideo(
      "videos/video5.mp4"
    );

  }


  // ========================================
  // DIAPORAMA
  // ========================================

  else if (scene === "photos") {

    lancerDiaporama();

  }


  // ========================================
  // PAGE 1
  // ========================================

  else if (scene === "page1") {

    afficherMessage(
      "PAGE 1"
    );

  }


  // ========================================
  // PAGE 2
  // ========================================

  else if (scene === "page2") {

    afficherMessage(
      "PAGE 2"
    );

  }


  // ========================================
  // MESSAGE
  // ========================================

  else if (scene === "message") {

    afficherMessage(
      "Bienvenue"
    );

  }


  // ========================================
  // NOIR
  // ========================================

  else if (scene === "black") {

    // Tout reste caché

    document.body.style.background =
      "black";

  }

}



// ==========================================
// AFFICHER VIDÉO
// ==========================================

function afficherVideo(source) {

  video.style.display =
    "block";


  video.classList.remove(
    "fade"
  );


  // Force le redémarrage de l'animation

  void video.offsetWidth;


  video.classList.add(
    "fade"
  );


  video.src =
    source;


  video.currentTime =
    0;


  video.play()
    .catch(
      (error) => {

        console.log(
          "Lecture automatique bloquée :",
          error
        );

      }
    );

}



// ==========================================
// AFFICHER MESSAGE
// ==========================================

function afficherMessage(text) {

  message.textContent =
    text;


  message.style.display =
    "flex";


  message.classList.remove(
    "fade"
  );


  void message.offsetWidth;


  message.classList.add(
    "fade"
  );

}



// ==========================================
// DIAPORAMA
// ==========================================

function lancerDiaporama() {

  slideshow.style.display =
    "block";


  currentSlide =
    0;


  afficherSlide();


  slideTimer =
    setInterval(

      () => {

        currentSlide++;

        if (
          currentSlide >=
          slides.length
        ) {

          currentSlide =
            0;

        }


        afficherSlide();

      },

      5000

    );

}



// ==========================================
// AFFICHER UNE PHOTO
// ==========================================

function afficherSlide() {

  slideImage.classList.remove(
    "fade"
  );


  void slideImage.offsetWidth;


  slideImage.classList.add(
    "fade"
  );


  slideImage.src =
    slides[currentSlide];

}



// ==========================================
// ARRÊTER DIAPORAMA
// ==========================================

function arreterDiaporama() {

  if (slideTimer) {

    clearInterval(
      slideTimer
    );

    slideTimer =
      null;

  }

}
