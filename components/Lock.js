class Lock {
    timeSpent = 0;
    difficulty = 0;
    pinNumber = 0;
    pins = []; // array of lockPin objects
    clock = null // element to show clock
    screen = null // element to show lock screen
    pinInfo = null // element to show pin information
    unlocked = false;
    constructor(difficulty, pinNumber) {
        this.timeSpent = 0;
        this.difficulty = difficulty;
        this.pinNumber = pinNumber;
        for (let i = 0; i < pinNumber; i++) {
            this.pins.push(new LockPin(i, difficulty));
        }
        this.addThisToPins();
        this.playWoah()
    }
    addThisToPins() {
        this.pins.forEach(pin => {
            pin.addParentLock(this);
        });
    }
    displayInfo() {
        console.log(`Lock Difficulty: ${this.difficulty}, Number of Pins: ${this.pinNumber}`);
        this.pins.forEach(pin => pin.displayInfo());
    }
    signalPinUnlocked(sourcePin) {
        console.log(`Lock received unlock signal from Pin ${sourcePin.position}`);
        let allUnlocked = this.pins.every(pin => pin.unlocked);
        if (allUnlocked) {
            console.log("Lock fully unlocked!");
            unlockedamount++;
            this.unlocked = true;
        }
    }
    startCounting() {
        this.timeSpent = 0
        setInterval(() => {
            if (this.unlocked) { return; } // stop counting if unlocked
            this.timeSpent += 1000;
            totalTimeSpent += 1;
            let totalSeconds = Math.floor(this.timeSpent / 1000);
            let minutes = 0
            let seconds = totalSeconds;
            if (seconds > 59) {
                while (seconds > 59) {
                    seconds -= 60;
                    minutes += 1;
                }
            }

            const secondsPadded = String(seconds).padStart(2, "0");
            if (minutes == 0) { this.clock.innerText = `Time spent: ${seconds}`; }
            else { this.clock.innerText = `Time spent: ${minutes}:${secondsPadded}`; }

        }, 1000);
    }
    applyPressureToSelectedPin(pressure) {
        totalPickUses++;
        let selectedPin = this.pins.find(pin => pin.selected);
        if (selectedPin) {
            selectedPin.applyPressure(pressure);
        }
    }
    addScreen(screenElement) {
        this.screen = screenElement;
    }
    addClock(clockElement) {
        this.clock = clockElement;
    }
    addPinInformation(pinInfoElement) {
        this.pinInfo = pinInfoElement;
    }
    updatePinInformation(info) {
        this.pinInfo.innerText = info;
    }
    reset() { // can reset due to overpressure, or changing a pin while it has pressure applied to it
        console.log("Lock resetting due to overpressure or pin change.");
        this.pins.forEach(pin => {
            pin.appliedPressure = 0;
            pin.unlocked = false;
            if (pin.pinButton) {
                pin.pinButton.style.backgroundColor = "#EEE82C";
                pin.pinButton.style.color = "black";
                pin.pinButton.innerText = `Pin ${pin.position}`;
            }
        });
        console.log(("Lock Reset. All pins set to 0 pressure."));
    }
    playWoah() {
        const woah = new Audio("../assets/audio/woah-group-sfx-442560.mp3");
        const soundInstance = woah.cloneNode();
        soundInstance.play();
        soundInstance.addEventListener("ended", () => soundInstance.remove())
    }
}