<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Nos Offres - Mafia Corp</title>
</head>
<body>
    <?php include 'templates/header.php'; ?>
    <h1>Nos Offres "Criminelles"</h1>
    <ul>
        <?php foreach ($offers as $offer): ?>
            <li><strong><?php echo $offer['title']; ?></strong> - <?php echo $offer['desc']; ?></li>
        <?php endforeach; ?>
    </ul>
    <a href="index.php">Retour à l'accueil</a>
    <h2>Boutique d'armes</h2>
    <a href="?page=shop">Accédez à notre boutique</a>
</body>
</html>