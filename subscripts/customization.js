var customBtn = document.getElementById("customBtn");


var closeCustomizationBtn = null; // Placeholder for close button inside customization menu

customBtn.addEventListener("click", () => {
    openCustomizationMenu();
});



var difficultyCustomization = 3;
var pinNumberCustomization = 5;

function extractCustomization() {
    console.log("Customization Extracted"); // Placeholder functionality
}

function changeDifficulty(newDifficulty) {
    if (newDifficulty < 1) newDifficulty = 1;
    if (newDifficulty > 10) newDifficulty = 10;
    window.difficultysetting = newDifficulty;
    console.log(`Difficulty changed to ${window.difficultysetting}`);
}

function closeCustomizationMenu() {
    const difficultyInput = document.getElementById("difficultyInput");
    changeDifficulty(difficultyInput.value)
    flexibleContainer.innerHTML = ""; // Clear customization menu
    flexibleContainer.style.height = "0px";
}

function openCustomizationMenu() {
    console.log("Customization Menu Opened"); // Placeholder functionality
    flexibleContainer.innerHTML = ""; // Clear previous content
    flexibleContainer.style.display = "flex";
    flexibleContainer.style.height = "32px";
    closeCustomizationBtn = document.createElement("button");
    closeCustomizationBtn.className = "controlBtn";
    closeCustomizationBtn.innerText = "Close";
    closeCustomizationBtn.addEventListener("click", () => {
        closeCustomizationMenu();
    });
    flexibleContainer.appendChild(closeCustomizationBtn);

    const difficultyLabel = document.createElement("label");
    difficultyLabel.innerText = "Difficulty (1-10): ";
    difficultyLabel.style.fontFamily = "Jura, sans-serif";
    difficultyLabel.style.fontSize = "18px";
    difficultyLabel.style.margin = "0 10px";
    const difficultyInput = document.createElement("input");
    difficultyInput.type = "number";
    difficultyInput.min = "1";
    difficultyInput.max = "100";
    difficultyInput.value = window.difficultysetting;
    difficultyInput.id = "difficultyInput";
    difficultyLabel.appendChild(difficultyInput);
    flexibleContainer.appendChild(difficultyLabel);

};