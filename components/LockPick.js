class LockPick {
    strength = 0;
    selected = false;
    pickButton = null;
    constructor(strength) {
        this.strength = strength;
    }
    toggleSelect() {
        this.selected = !this.selected;
        if (this.selected) {
            if (currentPick != null) {
                currentPick.toggleSelect();
            }
            console.log(`Pick of strength ${this.strength} selected.`);
            currentPressure = this.strength;
            currentPick = this;
            this.pickButton.style.backgroundColor = "#20a396";
            this.pickButton.style.color = "white";
            this.pickButton.style.border = "solid white 1.5px";
        }
        else {
            console.log(`Pick of strength ${this.strength} deselected.`);
            currentPressure = 0;
            currentPick = null;
            this.pickButton.style.backgroundColor = "#B3B3F1";
            this.pickButton.style.color = "black";
            this.pickButton.style.border = "none";
        }
    }
}