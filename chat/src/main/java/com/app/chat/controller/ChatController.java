package com.app.chat.controller;

import com.app.chat.model.ChatMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

/**
 * Controller that handles incoming chat messages and broadcasts them to /topic/messages.
 */
@Controller
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public ChatController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    /**
     * Receives messages sent by clients to /app/chat.sendMessage and forwards them to /topic/messages.
     * We add a server timestamp before broadcasting.
     */
    @MessageMapping("/chat.sendMessage")
    public void sendMessage(ChatMessage message) {
        // Add simple server timestamp
        String timestamp = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")
                .withZone(ZoneId.systemDefault())
                .format(Instant.now());

        message.setTimestamp(timestamp);

        // Broadcast to subscribed clients
        messagingTemplate.convertAndSend("/topic/messages", message);
    }
}
