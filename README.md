# 💬 Real-Time Chat Application
**Spring Boot + WebSocket + STOMP + SockJS**

A lightweight, full-stack real-time chat application built using **Java**, **Spring Boot**, **WebSocket**, **STOMP**, and **SockJS**.  
Features include instant messaging, emoji picker, chat themes, username colors, and message-sent sound effects.

---

## ✨ Features

### ⚡ Real-time Messaging
- Multi-user chat
- Broadcast messages instantly using STOMP over WebSocket
- **WebSocket endpoint:** `/ws`
- **Message sending endpoint:** `/app/chat.sendMessage`
- **Subscribed topic:** `/topic/messages`

### 🎨 Enhanced UI
- Multiple chat themes (Light, Dark, Blue, Green)
- Clean bubble-style chat interface
- Different colors for each user
- Responsive design for desktop and tablet

### 😀 User Interaction Features
- Emoji picker
- Message-sent & message-received sound notifications
- Auto-scroll to latest messages

### 🖥 Frontend
- Pure HTML, CSS, JavaScript
- SockJS + Stomp.js from CDN
- No build tools required

---

## 🛠 Tech Stack

**Backend**
- Java 17 / Java 11
- Spring Boot
- Spring WebSocket
- STOMP Messaging
- Maven

**Frontend**
- HTML5, CSS3, JavaScript
- SockJS
- Stomp.js
- Emoji picker
- Audio API for message sounds

---
## 📁 Project Structure


```text
src/
└─ main/
   ├─ java/com/chatapp/
   │  ├─ ChatApplication.java
   │  ├─ config/WebSocketConfig.java
   │  ├─ controller/ChatController.java
   │  ├─ model/ChatMessage.java
   │  └─ model/MessageType.java
   └─ resources/
      ├─ static/
      │  ├─ chat.html
      │  ├─ css/styles.css
      │  └─ js/chat.js
      └─ application.properties
pom.xml
```
---

## 🚀 How to Run

### 1️⃣ Clone the Project
```bash
git clone https://github.com/your-username/realtime-chat-app.git
cd realtime-chat-app
```

### 2️⃣ Run the Application
```bash
mvn spring-boot:run
```

### 3️⃣ Open the Chat UI

Open in your browser:
```bash
http://localhost:8080/chat.html
```

Open multiple browser tabs/windows to test real-time messaging.

---

## 🧪 Testing the App

1. Enter a username  
2. Click **Connect**  
3. Type a message and hit **Send**  
4. Observe messages in real-time across all connected clients  

---

## 📡 Endpoints

| Purpose                  | Endpoint                   |
|---------------------------|----------------------------|
| WebSocket handshake       | `/ws`                      |
| Send messages             | `/app/chat.sendMessage`    |
| Receive broadcast messages| `/topic/messages`          |

---

## 🔮 Future Enhancements

-  Private 1-to-1 messaging  
-  Chat history persistence (PostgreSQL or MongoDB)  
-  User online/offline indicators  
-  Typing indicators  
-  File/image sharing  
