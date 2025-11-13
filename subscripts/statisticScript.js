const statisticsBtn = document.getElementById("statisticsBtn");
statisticsBtn.addEventListener("click", showStatistics);

function showStatistics() {
    console.log(`${unlockedamount}, ${totalPickUses}, ${totalTimeSpent}`)
}