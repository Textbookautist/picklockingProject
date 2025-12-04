//statistics, no way to save yet.
var unlockedamount = 0; // Var instead of let, so the statistics script can see it.
var totalPickUses = 0;
var totalTimeSpent = 0;

let picksAvailable = 0;
let picksPouch = [];

const newLockBtn = document.getElementById("newLockBtn");
newLockBtn.addEventListener("click", newLock);

var flexibleContainer = document.getElementById("flexibleContainer");

const pickContainer = document.getElementById("pickContainer"); //holds available picks

const lockContainer = document.getElementById("lockContainer"); // holds the lock

let lock = null;
let currentPressure = 0;
let currentPick = null



function newLock() {
    console.log("New Lock Created"); // Placeholder functionality
    lock = new Lock(3, 5); // Example: difficulty 3, 5 pins (Current standard so should probably leave 3 as the minimum)
    lock.displayInfo();

    let lockbase = document.createElement("div");
    lockbase.className = "lockBase";
    lockContainer.innerHTML = ""; // Clear previous lock
    lockContainer.appendChild(lockbase);

    let pinrow = document.createElement("div");
    pinrow.className = "pinRow";
    lockbase.appendChild(pinrow);
    for (let [index, pin] of lock.pins.entries()) {
        let pinBtn = document.createElement("button");
        pinBtn.className = "circularBtn";
        pinBtn.innerText = `Pin ${pin.position}`;
        pinBtn.addEventListener("click", () => {
            pin.toggleSelect();
            console.log(`Pin ${pin.position} selected: ${pin.selected}`);
        });
        pin.addBtn(pinBtn);
        pinrow.appendChild(pinBtn);
    }

    let lockScreen = document.createElement("div");
    lockScreen.className = "lockScreen";
    lockbase.appendChild(lockScreen);
    lock.addScreen = lockScreen;

    let lockclock = document.createElement("p"); //keeps time the lock tracks with startCounting()
    lock.addClock(lockclock);
    lockclock.className = "lockClock";
    let quickdiv = document.createElement("div");
    quickdiv.style.position = "absolute";
    quickdiv.style.top = "10px";
    quickdiv.style.right = "10px";
    lockScreen.appendChild(quickdiv);
    quickdiv.appendChild(lockclock);
    lock.startCounting();

    let quickdiv2 = document.createElement("div");
    quickdiv2.style.position = "relative";
    quickdiv2.style.bottom = "10px";
    quickdiv2.style.left = "10px";
    lockScreen.appendChild(quickdiv2);
    let pinInformation = document.createElement("p");
    lock.addPinInformation(pinInformation);
    quickdiv2.appendChild(pinInformation);

    let applyPressureBtn = document.createElement("button");
    applyPressureBtn.className = "pickLockButton";
    applyPressureBtn.innerText = "Pick";
    applyPressureBtn.addEventListener("click", () => {
        if (lock) {
            if (currentPressure === 0) {
                console.log("No pick selected, cannot apply pressure.");
                return;
            }
            lock.applyPressureToSelectedPin(currentPressure);
        }
    });
    quickdiv2.appendChild(applyPressureBtn);
    lockbase.insertBefore(pickContainer, lockbase.firstChild);
    // make the pick container visible now that it's placed inside the lock
    pickContainer.style.display = "flex";
}

async function makePicks() {
    let startingValues = [3, 4, 5, 6, 7, 8]; // three of these are picked at random, turned into buttons
    let createdButtons = [];
    for (let i = 0; i < 3; i++) {
        let randIndex = Math.floor(Math.random() * startingValues.length);
        let pickStrength = startingValues[randIndex];
        startingValues.splice(randIndex, 1); // remove selected value to avoid duplicates
        let newPick = new LockPick(pickStrength);
        picksPouch.push(newPick);


        let pickBtn = document.createElement("button");
        pickBtn.className = "pickButton";
        pickBtn.innerText = `Pick Strength: ${pickStrength}`;
        pickBtn.addEventListener("click", () => {
            newPick.toggleSelect();
            console.log(`Pick of strength ${pickStrength} selected: ${newPick.selected}`);
        });
        newPick.pickButton = pickBtn;
        pickContainer.appendChild(pickBtn);
        createdButtons.push(pickBtn);
    }
    // check that there are both buttons with odd and even values in the createdButtons
    let hasOdd = createdButtons.some(btn => parseInt(btn.innerText.split(": ")[1]) % 2 !== 0);
    let hasEven = createdButtons.some(btn => parseInt(btn.innerText.split(": ")[1]) % 2 === 0);
    if (!hasOdd || !hasEven) {
        pickContainer.innerHTML = ""; // clear picks
        picksPouch = []; // reset picks pouch
        makePicks(); // try again
    }
}
makePicks();