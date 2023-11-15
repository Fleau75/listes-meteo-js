document.getElementById("packingForm").addEventListener("submit", function (e) {
    e.preventDefault();
    generatePackingList();
});

document.getElementById("reset").addEventListener("click", function () {
    resetForm();
});

function generatePackingList() {
    let nights = document.getElementById("nights").value;
    let climate = document.getElementById("climate").value;
    let packingListDiv = document.getElementById("packingList");

    packingListDiv.innerHTML = "";

    addToList(packingListDiv, "Sac à dos/valise");

    // Logique pour ajouter les items selon les règles
    addMultipleItems(packingListDiv, "Paires de chaussettes", nights, 10);
    addMultipleItems(packingListDiv, "Sous-vêtements", nights, 10);
    addMultipleItems(packingListDiv, "T-shirts", nights, 10);
    addMultipleItems(
        packingListDiv,
        "Pulls/Sweats",
        calculateClothingItems(nights, 1, 2, 3),
        3
    );
    addMultipleItems(
        packingListDiv,
        "Pantalons",
        calculateClothingItems(nights, 1, 2, 3),
        3
    );

    if (nights > 6) {
        addToList(packingListDiv, "Paire de chaussures");
    }

    if (climate !== "hot") {
        addToList(packingListDiv, "Veste");
    }
    if (climate === "hot") {
        addToList(packingListDiv, "Tongs/Claquettes");
    }
    if (climate === "cold") {
        addToList(packingListDiv, "Gants et Bonnets");
    }

    if (nights > 10) {
        packingListDiv.innerHTML +=
            "<p>Si vous partez en voyage plus de 10 nuits, faites des machines. Voyagez léger.</p>";
    }
}

function addToList(parent, item) {
    let div = document.createElement("div");
    div.classList.add("checkbox-item");
    div.innerHTML = `<input type="checkbox" id="${item}" name="${item}">
     <label for="${item}">${item}</label>`;
    parent.appendChild(div);
}

function addMultipleItems(parent, item, count, maxCount) {
    count = Math.min(count, maxCount);
    for (let i = 0; i < count; i++) {
        addToList(parent, item);
    }
}

function calculateClothingItems(nights, forLessThan4, for4To6, forMoreThan6) {
    if (nights < 4) {
        return forLessThan4;
    } else if (nights <= 6) {
        return for4To6;
    } else {
        return forMoreThan6;
    }
}

function resetForm() {
    document.getElementById("nights").value = 3;
    document.getElementById("climate").value = "moderate";
    document.getElementById("packingList").innerHTML = "";
}
