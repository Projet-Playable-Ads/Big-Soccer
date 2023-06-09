const downloadButton = () => {
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("btn-container");
    const downloadButton = document.createElement("a");
    downloadButton.setAttribute("id", "download-button");
    downloadButton.classList.add("btn");
    downloadButton.href = "https://apps.apple.com/us/app/crazy-kick-fun-football-game/id1469889140";
    
    const img = document.createElement("img");
    img.setAttribute("src", "assets/bigsoccerlogo1.png")

    const downloadText = document.createElement("span");
    downloadText.textContent = "Download!!!";
    
    downloadButton.append(img, downloadText);
    buttonContainer.append(downloadButton)

    return buttonContainer;
}

export { downloadButton };

