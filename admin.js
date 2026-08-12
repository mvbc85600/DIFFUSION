<!DOCTYPE html>
<html lang="fr">

<head>

  <meta charset="UTF-8">

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0">

  <title>Diffusion</title>


  <style>

    * {
      box-sizing: border-box;
    }


    html,
    body {

      margin: 0;

      width: 100%;

      height: 100%;

      background: black;

      overflow: hidden;

      font-family: Arial, sans-serif;

    }


    #diffusion {

      position: relative;

      width: 100vw;

      height: 100vh;

    }


    #video {

      position: absolute;

      width: 100%;

      height: 100%;

      object-fit: contain;

      display: none;

    }


    #message {

      position: absolute;

      inset: 0;

      display: flex;

      align-items: center;

      justify-content: center;

      color: white;

      font-size: 50px;

      text-align: center;

    }


    #slideshow {

      position: absolute;

      inset: 0;

      display: none;

      background: black;

    }


    #slideshow img {

      width: 100%;

      height: 100%;

      object-fit: contain;

    }


    .fade {

      animation: fade 1s ease;

    }


    @keyframes fade {

      from {

        opacity: 0;

      }

      to {

        opacity: 1;

      }

    }

  </style>

</head>


<body>


  <div id="diffusion">


    <video
      id="video"
      autoplay
      playsinline>
    </video>


    <div id="slideshow">

      <img
        id="slideImage"
        src=""
        alt="">

    </div>


    <div id="message">

      En attente de diffusion...

    </div>


  </div>



  <script
    type="module"
    src="diffusion.js">
  </script>


</body>

</html>
