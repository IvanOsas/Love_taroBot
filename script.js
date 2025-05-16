
const cardContainer = document.getElementById("cardContainer");
const sendButton = document.getElementById("sendButton");

const imageNames = ["01.png", "02.png", "03.png", "04.png", "05.png", "06.png", "07.png", "08.png"];
const selected = [];

imageNames.forEach(name => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.backgroundImage = `url(images/${name})`;
    card.dataset.name = name;
    card.onclick = () => {
        if (card.classList.contains("selected")) {
            card.classList.remove("selected");
            const index = selected.indexOf(name);
            if (index > -1) selected.splice(index, 1);
        } else {
            if (selected.length < 3) {
                card.classList.add("selected");
                selected.push(name);
            }
        }
        sendButton.disabled = selected.length !== 3;
    };
    cardContainer.appendChild(card);
});

sendButton.onclick = () => {
    if (window.Telegram.WebApp) {
        Telegram.WebApp.sendData(JSON.stringify(selected));
        Telegram.WebApp.close();
    }
};
