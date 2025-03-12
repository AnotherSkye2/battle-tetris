export function createLeaderBoard(gameElement) {
    const userNames = JSON.parse(sessionStorage.getItem("userNames"))

    let userScoreElementArray = []

    const leaderboardContainer = document.createElement("div");
    leaderboardContainer.classList.add("leaderboard-container");
    leaderboardContainer.id = "leaderboard-container"

    const leaderboard = document.createElement("div");
    leaderboard.classList.add("leaderboard", "pixel-corners");
    leaderboard.id = "leaderboard"

    for (let i = 0; i < userNames.length; i++) {
        const scoreContainer = document.createElement("div");
        scoreContainer.classList.add("score-container", "pixel-corners");

        const userScoreContainer = document.createElement("div");
        userScoreContainer.classList.add("user-score", "micro-5-regular");
        const userScoreElement = document.createElement("p");
        userScoreElement.innerHTML = 0
        userScoreContainer.appendChild(userScoreElement)

        const userNameContainer = document.createElement("div");
        userNameContainer.classList.add("user-name", "micro-5-regular");
        const userNameElement = document.createElement("p");
        userNameElement.innerHTML = userNames[i].name
        userNameContainer.appendChild(userNameElement)

        scoreContainer.append(userScoreContainer, userNameContainer)
        leaderboard.append(scoreContainer)

        userScoreElementArray.push({
            name: userNames[i].name,
            userScoreElement: userScoreElement
        })
    }

    leaderboardContainer.appendChild(leaderboard)
    gameElement.appendChild(leaderboardContainer)

    return userScoreElementArray
}
