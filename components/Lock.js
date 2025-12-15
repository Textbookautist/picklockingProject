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
        const isServer = location.protocol.startsWith("http");
        this.partyPlayed = false;
        this.timeSpent = 0;
        this.difficulty = difficulty;
        this.pinNumber = pinNumber;
        for (let i = 0; i < pinNumber; i++) {
            this.pins.push(new LockPin(i, difficulty));
        }
        this.addThisToPins();
        this.audioWoah = new Audio("assets/audioedits/new-lock.mp3");
        this.audioWoah.preload = "auto";

        if (isServer) {
            this.audioUnlock1 = new Audio("assets/audioedits/lock-open.mp3");
            this.audioUnlock1.preload = "auto";
            this.audioPin1 = new Audio("assets/audioedits/pin-click.mp3");
            this.audioPin1.preload = "auto";
            this.audioFail = new Audio("assets/audioedits/lock-fail.mp3");
            this.audioFail.preload = "auto";
            this.audioOpenPin = new Audio("assets/audioedits/pin-open.mp3");
            this.audioOpenPin.preload = "auto";
        } else {
            this.audioWoah = new Audio("../assets/audioedits/new-lock.mp3");
            this.audioUnlock1 = new Audio("../assets/audioedits/lock-open.mp3");
            this.audioPin1 = new Audio("../assets/audioedits/pin-click.mp3");
            this.audioFail = new Audio("../assets/audioedits/lock-fail.mp3");
            this.audioOpenPin = new Audio("../assets/audioedits/pin-open.mp3");
        }



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
        noise.volume = 2.0;
        noise.addEventListener("ended", () => noise.remove())

        const noiseServer = this.audioOpenPinServer.cloneNode();
        noiseServer.play();
        noiseServer.volume = 2.0;
        noiseServer.addEventListener("ended", () => noiseServer.remove())

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
                    const noise = this.audioUnlock1.cloneNode();
                    noise.play();
                    noise.addEventListener("ended", () => noise.remove())
                    this.partyPlayed = true;

                    const noiseServer = this.audioUnlock1Server.cloneNode();
                    noiseServer.play();
                    noiseServer.addEventListener("ended", () => noiseServer.remove())
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
        noise.play();
        noise.volume = 0.7;
        noise.addEventListener("ended", () => noise.remove())

        const noiseServer = this.audioFailServer.cloneNode();
        noiseServer.play();
        noiseServer.volume = 0.7;
        noiseServer.addEventListener("ended", () => noiseServer.remove())

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
        soundInstance.play();
        soundInstance.volume = 0.5;
        soundInstance.addEventListener("ended", () => soundInstance.remove())
        // if soundinstance not playing on server, play this other one
        const soundInstanceServer = this.audioWoahServer.cloneNode();
        soundInstanceServer.play();
        soundInstanceServer.volume = 0.5;
        soundInstanceServer.addEventListener("ended", () => soundInstanceServer.remove())
    }
}