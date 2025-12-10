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

function closeCustomizationMenu() {
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
    difficultyInput.max = "10";
    difficultyInput.value = difficultyCustomization;
    difficultyLabel.appendChild(difficultyInput);
    flexibleContainer.appendChild(difficultyLabel);

};