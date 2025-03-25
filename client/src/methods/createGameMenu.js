export default function createGameMenu() {
    const gameMenu = document.createElement("div");
    gameMenu.id = "game-menu";
    gameMenu.classList.add("game-menu", "pixel-corners--wrapper");
    gameMenu.style.visibility = "hidden";
    gameMenu.style.opacity = "0";
    gameMenu.style.pointerEvents = "none";

    const menuText = document.createElement("h2");
    menuText.innerText = "Game Paused by: ";
    gameMenu.appendChild(menuText);

    const resumeButton = document.createElement("p");
    resumeButton.innerText = "press ESC to resume";
    gameMenu.appendChild(resumeButton);

    const quitButton = document.createElement("button")
    quitButton.classList.add("pixel-corners")
    quitButton.innerText = "Quit";
    gameMenu.appendChild(quitButton);

    const restartButton = document.createElement("button")
    restartButton.innerText = "Restart"
    gameMenu.appendChild(restartButton);

    document.body.appendChild(gameMenu);

    return {gameMenu,menuText,quitButton, restartButton}
}