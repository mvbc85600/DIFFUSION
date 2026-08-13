import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// ==================================================
// CONFIGURATION FIREBASE
// ==================================================
const firebaseConfig = {
  apiKey: "AIzaSyAnwzIOCEgOMmuAHII9lujvq73Y81Fla00",
  authDomain: "diffusion-b9afa.firebaseapp.com",
  databaseURL: "https://diffusion-b9afa-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "diffusion-b9afa",
  storageBucket: "diffusion-b9afa.firebasestorage.app",
  messagingSenderId: "674799570797",
  appId: "1:674799570797:web:0d8b7a2a892f604eb7d464"
};

// ==================================================
// INITIALISATION FIREBASE
// ==================================================
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ==================================================
// RÉCUPÉRATION DES ÉLÉMENTS HTML
// ==================================================
const video = document.getElementById("video");
const message = document.getElementById("message");
const slideshow = document.getElementById("slideshow");
const slideImage = document.getElementById("slideImage");
const pageFrame = document.getElementById("pageFrame");

// ==================================================
// DIAPORAMA
// ==================================================
let slideTimer = null;
let currentSlide = 0;

const slides = [
  "photos/photo1.jpg",
  "photos/photo2.jpg",
  "photos/photo3.jpg"
];

// ==================================================
// RÉFÉRENCE FIREBASE POUR LE MESSAGE
// ==================================================
const messageRef = ref(db, "message");
let currentMessageData = null;

// Écouter les changements du message dans Firebase
onValue(messageRef, (snapshot) => {
  currentMessageData = snapshot.val();
  console.log("Message mis à jour :", currentMessageData);
});

// ==================================================
// ÉCOUTE FIREBASE POUR LA DIFFUSION
// ==================================================
const diffusionRef = ref(db, "diffusion");

onValue(diffusionRef, (snapshot) => {
  const data = snapshot.val();

  if (!data || !data.scene) {
    return;
  }

  console.log("Nouvelle scène :", data.scene);
  afficherScene(data.scene);
});

// ==================================================
// AFFICHER UNE SCÈNE
// ==================================================
function afficherScene(scene) {
  console.log("Affichage de la scène :", scene);

  // Arrêter le diaporama
  arreterDiaporama();

  // Arrêter complètement la vidéo
  video.pause();
  video.removeAttribute("src");
  video.load();

  // Cacher tous les éléments
  video.style.display = "none";
  slideshow.style.display = "none";
  message.style.display = "none";
  pageFrame.style.display = "none";

  // VIDÉO 1
  if (scene === "video1") {
    afficherVideo("video/defense.mp4");
  }
  // VIDÉO 2
  else if (scene === "video2") {
    afficherVideo("videos/video2.mp4");
  }
  // DIAPORAMA
  else if (scene === "photos") {
    lancerDiaporama();
  }
  // PARTENAIRES
  else if (scene === "partenaires") {
    afficherPage("partenaires.html");
  }
  // ÉVÉNEMENTS
  else if (scene === "evenements") {
    afficherPage("evenements.html");
  }
  // VIDÉOS MVBC
  else if (scene === "videomvbc") {
    afficherPage("videomvbc.html");
  }
  // MATCH DU SOIR
  else if (scene === "matchdusoir") {
    afficherPage("matchdusoir.html");
  }
  // CLASSEMENT NM2
  else if (scene === "classementnm2") {
    afficherPage("classementnm2.html");
  }
  // NOS ÉQUIPES
  else if (scene === "nosequipes") {
    afficherPage("nosequipes.html");
  }
  // PAGE 2
  else if (scene === "page2") {
    afficherMessage("PAGE 2");
  }
  // MESSAGE
  else if (scene === "message") {
    afficherMessagePersonnalise();
  }
  // ÉCRAN NOIR
  else if (scene === "black") {
    document.body.style.background = "#000";
  }
}

// ==================================================
// AFFICHER UNE VIDÉO
// ==================================================
function afficherVideo(source) {
  document.body.style.background = "#000";

  // Afficher la vidéo
  video.style.display = "block";

  // Transition
  video.classList.remove("fade");
  void video.offsetWidth;
  video.classList.add("fade");

  // Définir la vidéo
  video.src = source;
  video.currentTime = 0;

  console.log("Lecture vidéo :", source);

  // Lecture automatique
  video.play()
    .then(() => {
      console.log("Vidéo démarrée");
    })
    .catch((error) => {
      console.error("Impossible de démarrer la vidéo :", error);
    });
}

// ==================================================
// AFFICHER UNE PAGE HTML
// ==================================================
function afficherPage(page) {
  document.body.style.background = "#000";

  // Afficher l'iframe
  pageFrame.style.display = "block";

  // Transition
  pageFrame.classList.remove("fade");
  void pageFrame.offsetWidth;
  pageFrame.classList.add("fade");

  // Charger la page
  pageFrame.src = page;
  console.log("Page diffusée :", page);
}

// ==================================================
// AFFICHER UN MESSAGE PERSONNALISÉ
// ==================================================
function afficherMessagePersonnalise() {
  document.body.style.background = "#000";

  // Si on a des données de message, les utiliser
  if (currentMessageData) {
    // Appliquer le titre et le contenu
    const titre = currentMessageData.titre || "Message";
    const contenu = currentMessageData.contenu || "Aucun contenu";

    // Appliquer les couleurs
    const couleurTexte = currentMessageData.couleur || "#ffffff";
    const couleurFond = currentMessageData.fond || "#1e1e1e";

    // Mettre à jour le style du message
    message.innerHTML = `
      <div style="background-color: ${couleurFond}; padding: 40px; border-radius: 15px; max-width: 80%; margin: auto; text-align: center;">
        <h2 style="color: ${couleurTexte}; margin-bottom: 20px; font-size: 2.5em;">${titre}</h2>
        <p style="color: ${couleurTexte}; font-size: 1.5em; line-height: 1.6;">${contenu}</p>
      </div>
    `;
  } else {
    // Message par défaut si aucune donnée n'est disponible
    message.innerHTML = `
      <div style="background-color: #1e1e1e; padding: 40px; border-radius: 15px; max-width: 80%; margin: auto; text-align: center;">
        <h2 style="color: #ffffff; margin-bottom: 20px; font-size: 2.5em;">Message</h2>
        <p style="color: #ffffff; font-size: 1.5em; line-height: 1.6;">Bienvenue</p>
      </div>
    `;
  }

  // Afficher le message avec une transition
  message.style.display = "flex";
  message.classList.remove("fade");
  void message.offsetWidth;
  message.classList.add("fade");

  console.log("Message personnalisé affiché :", currentMessageData);
}

// ==================================================
// AFFICHER UN MESSAGE (ANCIENNE VERSION, CONSERVÉE POUR COMPATIBILITÉ)
// ==================================================
function afficherMessage(text) {
  document.body.style.background = "#000";
  message.textContent = text;
  message.style.display = "flex";
  message.classList.remove("fade");
  void message.offsetWidth;
  message.classList.add("fade");
}

// ==================================================
// LANCER LE DIAPORAMA
// ==================================================
function lancerDiaporama() {
  document.body.style.background = "#000";
  slideshow.style.display = "block";
  currentSlide = 0;
  afficherSlide();

  slideTimer = setInterval(() => {
    currentSlide++;
    if (currentSlide >= slides.length) {
      currentSlide = 0;
    }
    afficherSlide();
  }, 5000);
}

// ==================================================
// AFFICHER UNE PHOTO
// ==================================================
function afficherSlide() {
  slideImage.classList.remove("fade");
  void slideImage.offsetWidth;
  slideImage.classList.add("fade");
  slideImage.src = slides[currentSlide];
  console.log("Photo affichée :", slides[currentSlide]);
}

// ==================================================
// ARRÊTER LE DIAPORAMA
// ==================================================
function arreterDiaporama() {
  if (slideTimer !== null) {
    clearInterval(slideTimer);
    slideTimer = null;
  }
}
