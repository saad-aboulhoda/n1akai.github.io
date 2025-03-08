import { select } from "../utils.js";

export function showMessage(message) {
  const messagesContainer = select("#messagesContainer");
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  messageElement.textContent = message;

  messagesContainer.append(messageElement);
  messageElement.classList.add("slide-in");

  setTimeout(() => {
    messageElement.classList.add("slide-out");
    setTimeout(() => {
      messagesContainer.removeChild(messageElement);
    }, 700);
  }, 3000);
}
