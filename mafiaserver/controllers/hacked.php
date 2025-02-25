<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Accès au serveur...</title>
    <style>
        body { background: black; color: green; font-family: monospace; padding: 20px; }
        .console { border: 1px solid green; padding: 10px; height: 300px; overflow-y: auto; }
        .input { width: 100%; background: black; color: green; border: none; font-size: 16px; }
    </style>
</head>
<body>
    <h1>🔓 Terminal - Accès pirate</h1>
    <div class="console" id="console"></div>
    <input type="text" class="input" id="cmd" autofocus onkeypress="sendCommand(event)">
    <script>
        let consoleDiv = document.getElementById("console");
        function sendCommand(event) {
            if (event.key === "Enter") {
                let cmd = document.getElementById("cmd").value;
                document.getElementById("cmd").value = "";
                consoleDiv.innerHTML += "<p>&gt; " + cmd + "</p>";
                if (cmd === "ls") {
                    consoleDiv.innerHTML += "<p>server_dump.php</p>";
                } else if (cmd === "cat server_dump.php") {
                    fetch("server_dump.php?access=root")
                        .then(response => response.text())
                        .then(data => consoleDiv.innerHTML += "<pre>" + data + "</pre>");
                } else {
                    consoleDiv.innerHTML += "<p>Commande inconnue...</p>";
                }
                consoleDiv.scrollTop = consoleDiv.scrollHeight;
            }
        }
    </script>
</body>
</html>
