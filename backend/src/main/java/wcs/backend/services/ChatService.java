package wcs.backend.services;

import wcs.backend.dtos.ChatDto;
import wcs.backend.repositories.ChatRepository;
import wcs.backend.repositories.MediaRepository;
import wcs.backend.repositories.TicketRepository;
import wcs.backend.entities.Chat;
import wcs.backend.entities.Media;
import wcs.backend.entities.Ticket;
import wcs.backend.entities.User;

import java.util.stream.Collectors;
import java.util.List;
import java.util.Date;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ChatService {

  @Autowired
  private final ChatRepository chatRepository;
  @Autowired
  private final TicketRepository ticketRepository;
  @Autowired
  private final MediaRepository mediaRepository;
  @Autowired
  private final ModelMapper modelMapper;

  public List<ChatDto> getAllChats(Long ticketId) {
    List<Chat> chats;

    if (ticketId != null) {
      // Si ticketId est fourni, filtrez les chats par ticket_id
      chats = chatRepository.findByTicketId(ticketId);
    } else {
      // Sinon, récupérez tous les chats
      chats = chatRepository.findAll();
    }

    return chats.stream()
        .map(chat -> {
          ChatDto chatDto = modelMapper.map(chat, ChatDto.class);
          chatDto.setTicket_id(chat.getTicket().getId());
          return chatDto;
        })
        .collect(Collectors.toList());
  }

  public ChatDto getChatById(Long id) {
    Chat chat = chatRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Chat not found with ID: " + id));

    return modelMapper.map(chat, ChatDto.class);
  }

  public ChatDto addChat(ChatDto chatDto) {
    Chat chat = new Chat();
    chat.setMessage(chatDto.getMessage());

    // Convertir UserReadDto en User
    User author = modelMapper.map(chatDto.getAuthor(), User.class);
    chat.setAuthor(author);

    chat.setSent_date(new Date());

    // Récupérez le ticket existant depuis la base de données
    Ticket ticket = ticketRepository.findById(chatDto.getTicket_id())
        .orElseThrow(() -> new EntityNotFoundException("Ticket not found with ID: " + chatDto.getTicket_id()));

    // Associez le ticket au message du chat
    chat.setTicket(ticket);

    // Ajoutez le chat à la liste de chatMessages du ticket
    ticket.getChatMessages().add(chat);

    // Sauvegardez le ticket pour mettre à jour la relation
    ticketRepository.save(ticket);

    // Sauvegardez le chat
    chatRepository.save(chat);

    return modelMapper.map(chat, ChatDto.class);
  }

  public ChatDto updateChat(Long id, ChatDto chatDto) {
    Chat existingChat = chatRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Chat not found with ID: " + id));

    existingChat.setMessage(chatDto.getMessage());
    existingChat.setSent_date(new Date());

    chatRepository.save(existingChat);

    return modelMapper.map(existingChat, ChatDto.class);
  }

  public void deleteChat(Long id) {
    Chat chat = chatRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Chat not found with ID: " + id));

    Ticket ticket = chat.getTicket();
    ticket.getChatMessages().remove(chat);

    ticketRepository.save(ticket);

    // Check if the chat has associated media
    Media media = chat.getMedia();
    if (media != null) {
        // Remove the association between media and chat
        chat.setMedia(null);
        chatRepository.save(chat);

        // Delete the media
        mediaRepository.delete(media);
    }

    // Finally, delete the chat
    chatRepository.delete(chat);
}




}