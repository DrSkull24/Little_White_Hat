<!DOCTYPE html>
<html lang="fr">
    <head>
        <title>First interface</title>
        <link rel="stylesheet" href="firstInterface.css">
        <script src="firstGame.js"></script>
    </head>
    <body>
        <div id="screen">
            <p>oui</p>
            <textarea onclick="clearText(this)" onkeydown="handleEnterKey(event, this)">mot de passe</textarea>
        </div>
        <a href="secondInterface.php">
            <img id="laptopButton" src="img/ordinateur.png">
        </a>
        <img src="img/hiddenQRCode.png" width="16%" height="10%">
    </body>
</html>