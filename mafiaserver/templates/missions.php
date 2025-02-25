<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Missions - Mafia Corp</title>
</head>
<body>
    <?php include 'templates/header.php'; ?>
    <h1>Missions Secrètes</h1>
    <ul>
        <?php foreach ($missions as $mission): ?>
            <li><strong><?php echo $mission['title']; ?></strong> - <?php echo $mission['desc']; ?></li>
        <?php endforeach; ?>
    </ul>
    <a href="index.php">Retour à l'accueil</a>
</body>
</html>