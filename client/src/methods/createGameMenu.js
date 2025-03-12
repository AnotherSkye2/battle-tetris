
export function createGameMenu() {
    const gameMenu = document.createElement("div");
    gameMenu.id = "game-menu";
    gameMenu.classList.add("game-menu", "pixel-corners--wrapper");
    gameMenu.style.visibility = "hidden";
    gameMenu.style.opacity = "0";
    gameMenu.style.pointerEvents = "none";

    const menuText = document.createElement("h2");
    menuText.innerText = "Game Paused by: ";
    gameMenu.appendChild(menuText);

    const resumeButton = document.createElement("button");
    resumeButton.classList.add("pixel-corners")
    resumeButton.innerText = "press ESC to resume";
    gameMenu.appendChild(resumeButton);

    const quitButton = document.createElement("button")
    quitButton.classList.add("pixel-corners")
    quitButton.innerText = "click here to quit game";
    gameMenu.appendChild(quitButton);

    const restartButton = document.createElement("button")
    restartButton.innerText = "click here to restart the game"
    gameMenu.appendChild(restartButton);

    document.body.appendChild(gameMenu);

    return {gameMenu,menuText,quitButton, restartButton}
}