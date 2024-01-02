package wcs.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import wcs.backend.services.ChatService;
import wcs.backend.dtos.ChatDto;

import java.util.List;


@RestController
@AllArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping(path = "api/chat")
@Tag(name = "Chat", description = "Chat Controller")

public class ChatController {

    @Autowired
    private final ChatService chatService;

    @GetMapping
    @Operation(summary = "Get all chats", description = "Get all chats")
    public List<ChatDto> getAllChats(@RequestParam(name = "ticket_id", required = false) Long ticketId) {
        return chatService.getAllChats(ticketId);
    }
    

    @GetMapping("/{id}")
    @Operation(summary = "Get chat by ID", description = "Get chat by ID")
    public ChatDto getChatById(@PathVariable Long id) {
        return chatService.getChatById(id);
    }
    
    @PostMapping
    @Operation(summary = "Add a chat", description = "Add a chat")
    public ChatDto addChat(@RequestBody ChatDto chatDto) {
        return chatService.addChat(chatDto);
    }

   
}