const statisticsBtn = document.getElementById("statisticsBtn");
statisticsBtn.addEventListener("click", showStatistics);



function closeStatisticsMenu() {
    flexibleContainer.innerHTML = ""; // Clear customization menu
    flexibleContainer.style.height = "0px";
}

function showStatistics() {
    console.log(`${unlockedamount}, ${totalPickUses}, ${totalTimeSpent}`)
    flexibleContainer.innerHTML = ""; // Clear previous content
    flexibleContainer.style.display = "flex";
    flexibleContainer.style.height = "120px";
    flexibleContainer.style.alignItems = "center";

    const closeStatisticsBtn = document.createElement("button");
    closeStatisticsBtn.className = "controlBtn";
    closeStatisticsBtn.innerText = "Close";
    closeStatisticsBtn.addEventListener("click", () => {
        closeStatisticsMenu();
    });
    flexibleContainer.appendChild(closeStatisticsBtn);
    // next display unlockedamount, totalPickUses, totalTimeSpent
    const statsDiv = document.createElement("div");
    statsDiv.style.color = "white";
    statsDiv.innerHTML = `<p>Total Locks Unlocked: ${unlockedamount}</p>
                          <p>Total Pick Uses: ${totalPickUses}</p>
                          <p>Total Time Spent Picking: ${totalTimeSpent} seconds</p>`;
    flexibleContainer.appendChild(statsDiv);
}