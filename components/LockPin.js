class LockPin {
    parentLock = null;
    position = 0;
    unlocked = false;
    pressureTreshold = 0;
    appliedPressure = 0;
    selected = false;
    pinButton = null;
    constructor(pos, difficultyRating) { // makes a pressure treshold based on difficulty, minimum of 21
        this.position = pos;
        this.pressureTreshold = Math.floor(Math.random() * (difficultyRating * 10)) + 21;
        console.log(`Created Pin at position ${this.position} with pressure treshold ${this.pressureTreshold}.`);
    }
    addBtn(btn) {
        this.pinButton = btn;
    }
    addParentLock(lock) {
        this.parentLock = lock;
    }
    displayInfo() {
        console.log(`     Pin Position: ${this.position}, Pressure Treshold: ${this.pressureTreshold}`);

    }
    toggleSelect() {
        if (this.unlocked) {
            console.log(`Pin ${this.position} is already unlocked, cannot select.`);
            return;
        }
        this.selected = !this.selected;
        if (this.selected) {
            this.parentLock.updatePinInformation(`${this.pressureTreshold} / ${this.appliedPressure}`);
            this.pinButton.style.backgroundColor = "#c61aa1";
            this.pinButton.style.color = "white";
            this.parentLock.pins.forEach(pin => {
                if (pin !== this && pin.selected) {
                    pin.toggleSelect();
                }
            });
        }
        else {
            this.pinButton.style.backgroundColor = "#EEE82C";
            this.pinButton.style.color = "black";
            if (this.appliedPressure > 0) {
                this.parentLock.reset()
            }
        }
    }
    applyPressure(currentPressure) {
        this.appliedPressure += currentPressure
        if (this.appliedPressure > this.pressureTreshold) {
            this.parentLock.reset();
        }
        else if (this.appliedPressure === this.pressureTreshold) {
            this.unlocked = true;
            this.parentLock.updatePinInformation(`${this.pressureTreshold} / ${this.appliedPressure}`);
            console.log(`Pin ${this.position} unlocked!`);
            this.selected = false;
            this.pinButton.style.backgroundColor = "#20a396";
            this.pinButton.style.color = "white";
            if (this.pinButton) {
                this.pinButton.innerText = "✓";
            }
            this.parentLock.signalPinUnlocked(this);
        }
        this.parentLock.updatePinInformation(`${this.pressureTreshold} / ${this.appliedPressure}`);
    }
    cheatUnlock() {
        this.unlocked = true;
        this.parentLock.signalPinUnlocked(this);
    }
}