import "../css/ui.css";

const downloadButton = () => {
    const downloadButton = document.createElement("a");
    downloadButton.setAttribute("id", "download-button");
    downloadButton.classList.add("btn");
    downloadButton.href = "https://www.google.com";
    
    const span = document.createElement("span");
    span.textContent = "Big Soccer";

    const downloadText = span.cloneNode();
    downloadText.textContent = "Download !!!";
    
    downloadButton.append(span, downloadText);

    return downloadButton;
}

const createUI = () => {
    const elements = [
        downloadButton(),
    ]

    document.body.append(...elements);
};

export { createUI };
