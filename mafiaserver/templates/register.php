<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Inscription - Mafia Corp</title>
</head>
<body>
    <?php include 'templates/header.php'; ?>
    <h1>Inscription</h1>
    <form method="POST">
        <input type="text" name="username" placeholder="Nom d'utilisateur" required>
        <input type="password" name="password" placeholder="Mot de passe" required>
        <button type="submit">S'inscrire</button>
    </form>
    <a href="?page=login">Déjà un compte ?</a>
</body>
</html>