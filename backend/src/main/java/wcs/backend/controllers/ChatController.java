package wcs.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import wcs.backend.services.ChatService;
import wcs.backend.dtos.ChatDto;

import java.util.List;

@RequestMapping(path = "api/chat")
public class ChatController {
    @Autowired
    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @GetMapping
    public List<ChatDto> getAllChats() {
        return chatService.getAllChats();
    }

    @PostMapping
    public ChatDto addChat(@RequestBody ChatDto chatDto) {
        return chatService.addChat(chatDto);
    }

}