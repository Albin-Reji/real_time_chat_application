let stompClient = null;
let userColors = {};

const emojiList = [
  "😀","😁","😂","🤣","😅","😊","😍","😋",
  "😎","🤩","😘","🥳","😇","🤔","😴","😢",
  "😡","👍","👎","🙏","👏","🔥","❤️","💯"
];

function generateColorForUser(username) {
  if (userColors[username]) return userColors[username];

  const colors = [
    "#E74C3C", "#3498DB", "#9B59B6",
    "#1ABC9C", "#F39C12", "#2ECC71",
    "#E91E63", "#3F51B5", "#FF5722"
  ];

  return (userColors[username] = colors[Math.floor(Math.random()*colors.length)]);
}

function setConnected(connected) {
  document.getElementById('connectBtn').disabled = connected;
  document.getElementById('disconnectBtn').disabled = !connected;
  document.getElementById('chat').classList.toggle('hidden', !connected);
}

function connect() {
  const username = document.getElementById('username').value.trim();
  if (!username) return alert("Enter a name!");

  const socket = new SockJS('/ws');
  stompClient = Stomp.over(socket);
  stompClient.debug = null;

  stompClient.connect({}, () => {
    setConnected(true);

    stompClient.subscribe('/topic/messages', message => {
      showMessage(JSON.parse(message.body));
    });
  });
}

function disconnect() {
  if (stompClient) stompClient.disconnect();
  setConnected(false);
}

function sendMessage(event) {
  event.preventDefault();

  const content = document.getElementById('messageInput').value.trim();
  const sender = document.getElementById('username').value.trim();

  if (!content) return;

  stompClient.send('/app/chat.sendMessage', {}, JSON.stringify({ sender, content }));

  document.getElementById('messageInput').value = "";

  // Play sound
  document.getElementById("sentSound").play();
}

function showMessage(msg) {
  const messagesDiv = document.getElementById('messages');

  const item = document.createElement('div');
  item.className = "message";

  const badge = document.createElement('div');
  badge.className = "user-badge";
  badge.style.background = generateColorForUser(msg.sender);
  badge.textContent = msg.sender.charAt(0).toUpperCase();

  const bubble = document.createElement('div');
  bubble.className = "bubble";
  bubble.innerHTML = `<strong>${msg.sender}</strong><br>${msg.content}`;

  item.appendChild(badge);
  item.appendChild(bubble);

  messagesDiv.appendChild(item);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

/* ===== Theme Switcher ===== */
document.getElementById("themeSelector").addEventListener("change", e => {
  document.body.className = e.target.value;
});

/* ===== Emoji Picker ===== */
const picker = document.getElementById("emojiPicker");
const emojiBtn = document.getElementById("emojiBtn");

emojiBtn.addEventListener("click", () => {
  picker.classList.toggle("hidden");
});

// Load emoji list
emojiList.forEach(em => {
  const span = document.createElement("span");
  span.textContent = em;
  span.onclick = () => {
    document.getElementById("messageInput").value += em;
  };
  picker.appendChild(span);
});

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('connectBtn').addEventListener('click', connect);
  document.getElementById('disconnectBtn').addEventListener('click', disconnect);
  document.getElementById('messageForm').addEventListener('submit', sendMessage);
});
