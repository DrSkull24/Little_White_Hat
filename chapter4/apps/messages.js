const conversations = {
    "Laeticia": [
        { text: "Salut Laeticia !", type: "sent" },
        { text: "Coucou ! Comment ça va ?", type: "received" },
        { text: "Très bien", type: "sent" },
        { text: "Et toi ?", type: "sent" }
    ],
    "Bob": [
        { text: "Hey, t'es toujours dispo pour ce soir ?", type: "received" },
        { text: "Oui, mais je ne pourrais pas rester toute la soirée", type: "sent" },
        { text: "C'est le jour où je suis de garde", type: "sent" },
        { text: "Oui je sais", type: "received" },
        { text: "Mais aucun souci, tu pourras même partir plus tôt s'il le faut", type: "received" }
    ],

    "Amori": [
        { text: "Salut, c'est Amori", type: "received" },
        { text: "Voilà mon nouveau numéro", type: "received" }
    ]
};

const MessagesApp = { 
    open: function() {
        document.getElementById("messages-screen").style.display = "flex";
    },
    close: function() {
        document.getElementById("messages-screen").style.display = "none";
    },
    openChat: function(contact) {
        document.getElementById("messages-screen").style.display = "none";
        document.getElementById("chat-screen").style.display = "flex";
        document.getElementById("chat-header").textContent = contact;

        let chatBox = document.getElementById("chat-messages");
        chatBox.innerHTML = "";

        conversations[contact].forEach(msg => {
            let msgDiv = document.createElement("div");
            msgDiv.classList.add("message", msg.type);
            msgDiv.textContent = msg.text;
            chatBox.appendChild(msgDiv);
        });
    },
    closeChat: function() {
        document.getElementById("chat-screen").style.display = "none";
        document.getElementById("messages-screen").style.display = "flex";
    }
};

