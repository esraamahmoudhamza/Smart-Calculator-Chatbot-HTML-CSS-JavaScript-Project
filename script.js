function sendMessage() {
  const inputField = document.getElementById("userInput");
  const chatBox = document.getElementById("chatBox");
  const userText = inputField.value.trim();
  if (userText === "") return;

  appendMessage(userText, "user-message");

  try {
    let result = eval(userText.replace(/\^/g, "**"));
    if (isNaN(result)) throw "Invalid";
    appendMessage("Result: " + result, "bot-message", result);
  } catch (error) {
    appendMessage("Error: Invalid Expression", "bot-message");
  }

  inputField.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;
}

function appendMessage(text, className, result = null) {
  const chatBox = document.getElementById("chatBox");
  const message = document.createElement("div");
  message.className = "message " + className;
  message.textContent = text;

  if (className === "bot-message" && result !== null) {
    const copyBtn = document.createElement("button");
    copyBtn.className = "copy-btn";
    copyBtn.innerHTML = "📋";
    copyBtn.onclick = () => navigator.clipboard.writeText(result);
    message.appendChild(copyBtn);
  }

  chatBox.appendChild(message);
}

function clearHistory() {
  document.getElementById("chatBox").innerHTML = "";
}

document.getElementById("userInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") sendMessage();
});
