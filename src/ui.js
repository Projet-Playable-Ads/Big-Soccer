import "../css/ui.css";

const createUI = () => {
  const downloadButton = document.createElement("button");
  downloadButton.setAttribute("id", "download-button");
  downloadButton.textContent = "Download";
  document.body.appendChild(downloadButton);
};

export { createUI };
