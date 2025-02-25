<?php session_start(); ?>
<header>
    <h1>Mafia Corp</h1>
    <?php if (isset($_SESSION['user'])): ?>
        <p>Bienvenue, <?php echo $_SESSION['user']; ?> | <a href="logout.php">Déconnexion</a></p>
    <?php else: ?>
        <a href="?page=login">Connexion</a> | <a href="?page=register">Inscription</a>
    <?php endif; ?>
</header>
