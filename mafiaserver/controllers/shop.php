<?php
// Liste des produits en dur (sans base de données)
$products = [
    ['name' => 'Pistolet', 'description' => 'Un pistolet de haute précision.', 'price' => 500, 'models' => 'gun.jpg'],
    ['name' => 'Fusil à pompe', 'description' => 'Idéal pour les combats rapprochés.', 'price' => 1200, 'image' => 'fusil_pompe.jpg'],
    ['name' => 'AK-47', 'description' => 'Une arme de guerre redoutable.', 'price' => 2500, 'models' => 'rifle.jpg'],
    ['name' => 'Sniper', 'description' => 'Parfait pour les attaques à distance.', 'price' => 5000, 'models' => 'sniper.jpg']
];

require "templates/shop.php";
?>
