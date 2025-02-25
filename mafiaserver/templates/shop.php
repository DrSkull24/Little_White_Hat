<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Boutique - Mafia Corp</title>
    <style>
        .shop {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
        }
        .product {
            border: 1px solid #ccc;
            padding: 15px;
            width: 250px;
            text-align: center;
            background: #222;
            color: white;
            border-radius: 8px;
        }
        .product img {
            width: 100%;
            height: auto;
            border-radius: 5px;
        }
        .buy-button {
            background: red;
            color: white;
            padding: 10px;
            border: none;
            cursor: pointer;
            margin-top: 10px;
        }
        .buy-button:hover {
            background: darkred;
        }
    </style>
</head>
<body>
    <h1>Boutique d'armes</h1>
    <div class="shop">
        <?php foreach ($products as $product): ?>
            <div class="product">
                <img src="models/<?php echo $product['models']; ?>" alt="<?php echo $product['name']; ?>">
                <h2><?php echo $product['name']; ?></h2>
                <p><?php echo $product['description']; ?></p>
                <p>Prix: <?php echo $product['price']; ?>$</p>
                <button class="buy-button">Acheter</button>
            </div>
        <?php endforeach; ?>
    </div>
</body>
</html>

