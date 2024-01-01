package wcs.backend.services;

import wcs.backend.dtos.ChatDto;
import wcs.backend.mapper.ChatMapper;
import wcs.backend.repositories.ChatRepository;
import wcs.backend.entities.Chat;


import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

public class ChatService {
    @Autowired
    private final ChatRepository chatRepository;
    @Autowired
    private final ChatMapper chatMapper;

    public ChatService(ChatRepository chatRepository , ChatMapper chatMapper) {
        this.chatRepository = chatRepository;
        this.chatMapper = chatMapper;
    }

    public List<ChatDto> getAllChats() {
        List<Chat> chats = chatRepository.findAll();
        return Collections.singletonList(chatMapper.chatToChatDto((Chat) chats));
    }

    public ChatDto addChat(ChatDto chatDto) {
        Chat chat = chatMapper.chatDtoToChat(chatDto);
        chatRepository.save(chat);
        return chatDto;
    }

}