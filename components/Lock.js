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
        this.partyPlayed = false;
        this.timeSpent = 0;
        this.difficulty = difficulty;
        this.pinNumber = pinNumber;
        this.pins = [];
        this.unlocked = false;
        this.cheatDown = false;
        this.cheatUnlockCounter = 0;

        for (let i = 0; i < pinNumber; i++) {
            this.pins.push(new LockPin(i, difficulty));
        }
        this.addThisToPins();

        // base path relative to html at root
        const basePath = "assets/audioedits/";

        this.audioWoah = new Audio(basePath + "new-lock.mp3");
        this.audioUnlock1 = new Audio(basePath + "lock-open.mp3");
        this.audioPin1 = new Audio(basePath + "pin-click.mp3");
        this.audioFail = new Audio(basePath + "lock-fail.mp3");
        this.audioOpenPin = new Audio(basePath + "pin-open.mp3");

        [this.audioWoah, this.audioUnlock1, this.audioPin1, this.audioFail, this.audioOpenPin]
            .forEach(a => a.preload = "auto");

        this.playWoah();
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
        const noise = this.audioOpenPin.cloneNode();
        noise.play();
        noise.volume = 1.0;
        noise.addEventListener("ended", () => noise.remove())

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
            if (this.unlocked) {
                if (!this.partyPlayed) {
                    this.audioUnlock1.play();
                    this.partyPlayed = true;
                }
                return;
            } // stop counting if unlocked
            if (this.cheatDown) { this.cheatUnlockCounter++; }
            else { this.cheatUnlockCounter = 0; }
            if (this.cheatUnlockCounter >= 2) {
                this.cheatUnlock();
            }
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

        const noise = this.audioPin1.cloneNode();
        noise.play();
        noise.volume = 0.7;
        noise.addEventListener("ended", () => noise.remove())
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
        const noise = this.audioFail.cloneNode();
        noise.preload = "auto";
        noise.play();
        noise.volume = 0.7;
        noise.addEventListener("ended", () => noise.remove())

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
        const soundInstance = this.audioWoah.cloneNode();
        soundInstance.preload = "auto";
        soundInstance.play();
        soundInstance.volume = 0.5;
        soundInstance.addEventListener("ended", () => soundInstance.remove())
    }
}