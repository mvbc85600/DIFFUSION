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
// AFFICHER UN MESSAGE PERSONNALISÉ AVEC EFFETS STYLISÉS
// ==================================================
function afficherMessagePersonnalise() {
  document.body.style.background = "#000";

  // Créer un conteneur pour le message
  const messageContainer = document.createElement("div");
  messageContainer.className = "message-container";

  // Appliquer les styles CSS dynamique
  const style = document.createElement("style");
  style.textContent = `
    .message-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      animation: fadeIn 1.5s ease-in-out forwards;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.9); }
      to { opacity: 1; transform: scale(1); }
    }

    .message-box {
      max-width: 80%;
      padding: 40px;
      border-radius: 20px;
      text-align: center;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
      position: relative;
      overflow: hidden;
      transform: translateY(20px);
      opacity: 0;
      animation: slideUp 1s ease-out 0.5s forwards;
    }

    @keyframes slideUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    .message-box::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 5px;
      background: linear-gradient(90deg, transparent, ${currentMessageData ? currentMessageData.couleur : '#ffffff'}, transparent);
      animation: shine 2s infinite alternate;
    }

    @keyframes shine {
      from { opacity: 0.5; transform: scaleX(0.8); }
      to { opacity: 1; transform: scaleX(1.2); }
    }

    .message-title {
      font-size: 2.5em;
      margin-bottom: 20px;
      font-weight: bold;
      opacity: 0;
      animation: typing 0.5s ease-out 1s forwards, fadeInText 1s ease-out 1s forwards;
      white-space: nowrap;
      overflow: hidden;
      border-right: 3px solid ${currentMessageData ? currentMessageData.couleur : '#ffffff'};
    }

    @keyframes typing {
      from { width: 0; }
      to { width: 100%; }
    }

    @keyframes fadeInText {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .message-content {
      font-size: 1.5em;
      line-height: 1.8;
      opacity: 0;
      animation: fadeInText 1s ease-out 1.5s forwards;
    }

    .message-glow {
      position: absolute;
      width: 300px;
      height: 300px;
      border-radius: 50%;
      background: radial-gradient(circle, ${currentMessageData ? currentMessageData.couleur : '#ffffff'}20, transparent 70%);
      filter: blur(50px);
      z-index: -1;
      animation: pulseGlow 3s ease-in-out infinite alternate;
    }

    @keyframes pulseGlow {
      from { transform: scale(0.8); opacity: 0.5; }
      to { transform: scale(1.2); opacity: 0.8; }
    }
  `;
  document.head.appendChild(style);

  // Si on a des données de message, les utiliser
  if (currentMessageData) {
    const titre = currentMessageData.titre || "Message";
    const contenu = currentMessageData.contenu || "Aucun contenu";
    const couleurTexte = currentMessageData.couleur || "#ffffff";
    const couleurFond = currentMessageData.fond || "#1e1e1e";

    // Créer la structure du message
    messageContainer.innerHTML = `
      <div class="message-glow"></div>
      <div class="message-box" style="background-color: ${couleurFond}; color: ${couleurTexte};">
        <div class="message-title" style="color: ${couleurTexte}">${titre}</div>
        <div class="message-content" style="color: ${couleurTexte}">${contenu}</div>
      </div>
    `;
  } else {
    // Message par défaut si aucune donnée n'est disponible
    messageContainer.innerHTML = `
      <div class="message-glow" style="background: radial-gradient(circle, #ffffff20, transparent 70%);"></div>
      <div class="message-box" style="background-color: #1e1e1e; color: #ffffff;">
        <div class="message-title">Message</div>
        <div class="message-content">Bienvenue</div>
      </div>
    `;
  }

  // Vider le conteneur de message existant et ajouter le nouveau
  message.innerHTML = "";
  message.appendChild(messageContainer);
  message.style.display = "flex";

  console.log("Message personnalisé affiché avec effets stylisés :", currentMessageData);
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
