<?php
$clients = [
    ['name' => 'Tony Montana', 'email' => 'scarface@cartel.com', 'transactions' => '15M$ blanchis'],
    ['name' => 'Vito Corleone', 'email' => 'godfather@mafia.com', 'transactions' => '50M$ deals'],
    ['name' => 'Walter White', 'email' => 'heisenberg@blue.com', 'transactions' => 'Meth export USA'],
];

// Simule un accès en mode "hacker"
if ($_GET['access'] === 'root') {
    echo "<h1>💀 Accès au serveur compromis 💀</h1>";
    echo "<pre>" . print_r($clients, true) . "</pre>";
} else {
    http_response_code(403);
    die("Accès refusé");
}
?>
