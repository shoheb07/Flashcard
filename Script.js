let cards = JSON.parse(localStorage.getItem("flashcards")) || [];

function saveToLocalStorage() {
    localStorage.setItem("flashcards", JSON.stringify(cards));
}

function renderCards() {
    const container = document.getElementById("cards-container");
    container.innerHTML = "";

    cards.forEach((card, index) => {
        const cardDiv = document.createElement("div");
        cardDiv.className = "card";

        cardDiv.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${card.question}</div>
                <div class="card-back">
                    ${card.answer}
                    <button class="delete-btn" onclick="deleteCard(${index})">X</button>
                </div>
            </div>
        `;

        cardDiv.addEventListener("click", function() {
            this.classList.toggle("flipped");
        });

        container.appendChild(cardDiv);
    });
}

function addCard() {
    const question = document.getElementById("question").value;
    const answer = document.getElementById("answer").value;

    if (question === "" || answer === "") {
        alert("Please enter both question and answer.");
        return;
    }

    cards.push({ question, answer });
    saveToLocalStorage();
    renderCards();

    document.getElementById("question").value = "";
    document.getElementById("answer").value = "";
}

function deleteCard(index) {
    cards.splice(index, 1);
    saveToLocalStorage();
    renderCards();
}

renderCards();
