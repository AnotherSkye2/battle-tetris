export function createLeaderBoard(gameElement) {
    const users = JSON.parse(sessionStorage.getItem("users"))

    let userScoreElementArray = []

    const leaderboardContainer = document.createElement("div");
    leaderboardContainer.classList.add("leaderboard-container");

    const leaderboard = document.createElement("div");
    leaderboard.classList.add("leaderboard", "pixel-corners");

    for (let i = 0; i < users.length; i++) {
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
        userNameElement.innerHTML = users[i].name
        userNameContainer.appendChild(userNameElement)

        scoreContainer.append(userScoreContainer, userNameContainer)
        leaderboard.append(scoreContainer)

        userScoreElementArray.push({
            name: users[i].name,
            userScoreElement: userScoreElement
        })
    }

    leaderboardContainer.appendChild(leaderboard)
    gameElement.appendChild(leaderboardContainer)

    return userScoreElementArray
}


export function updateLeaderBoard() {}