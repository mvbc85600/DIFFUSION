import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

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

  appId: "1:674799570797:web:0d8b7a2a892f604eb7d464"

};


// ==========================================
// INITIALISATION FIREBASE
// ==========================================

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);


// ==========================================
// ÉLÉMENTS HTML
// ==========================================

const video = document.getElementById("video");

const message = document.getElementById("message");

const slideshow = document.getElementById("slideshow");

const slideImage = document.getElementById("slideImage");

const partenairesFrame =
  document.getElementById("partenairesFrame");


// ==========================================
// DIAPORAMA
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

const diffusionRef = ref(db, "diffusion");

onValue(
  diffusionRef,
  (snapshot) => {

    const data = snapshot.val();

    if (!data || !data.scene) {
      return;
    }

    console.log(
      "Nouvelle scène :",
      data.scene
    );

    afficherScene(data.scene);

  }
);


// ==========================================
// AFFICHER UNE SCÈNE
// ==========================================

function afficherScene(scene) {

  // Arrêter le diaporama
  arreterDiaporama();


  // Arrêter la vidéo
  video.pause();

  video.removeAttribute("src");

  video.load();


  // Cacher tous les éléments
  video.style.display = "none";

  slideshow.style.display = "none";

  message.style.display = "none";

  partenairesFrame.style.display = "none";


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
  // PAGE 1 = PARTENAIRES
  // ========================================

  else if (scene === "page1") {

    afficherPartenaires();

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
  // ÉCRAN NOIR
  // ========================================

  else if (scene === "black") {

    document.body.style.background =
      "black";

  }

}


// ==========================================
// AFFICHER UNE VIDÉO
// ==========================================

function afficherVideo(source) {

  document.body.style.background =
    "black";


  video.style.display =
    "block";


  video.classList.remove("fade");

  void video.offsetWidth;

  video.classList.add("fade");


  video.src = source;

  video.currentTime = 0;


  video.play()
    .then(() => {

      console.log(
        "Lecture vidéo :",
        source
      );

    })
    .catch((error) => {

      console.error(
        "Erreur de lecture vidéo :",
        error
      );

      afficherMessage(
        "Impossible de lire la vidéo."
      );

    });

}


// ==========================================
// AFFICHER PARTENAIRES
// ==========================================

function afficherPartenaires() {

  document.body.style.background =
    "black";


  partenairesFrame.style.display =
    "block";


  partenairesFrame.classList.remove(
    "fade"
  );

  void partenairesFrame.offsetWidth;

  partenairesFrame.classList.add(
    "fade"
  );


  partenairesFrame.src =
    "partenaires.html";


  console.log(
    "Affichage de partenaires.html"
  );

}


// ==========================================
// AFFICHER UN MESSAGE
// ==========================================

function afficherMessage(text) {

  document.body.style.background =
    "black";


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
// LANCER DIAPORAMA
// ==========================================

function lancerDiaporama() {

  document.body.style.background =
    "black";


  slideshow.style.display =
    "block";


  currentSlide = 0;


  afficherSlide();


  slideTimer = setInterval(

    () => {

      currentSlide++;


      if (
        currentSlide >=
        slides.length
      ) {

        currentSlide = 0;

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

  if (slideTimer !== null) {

    clearInterval(
      slideTimer
    );

    slideTimer = null;

  }

}
