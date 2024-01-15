package wcs.backend.services;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import wcs.backend.dtos.MediaDto;
import wcs.backend.dtos.MediaGetAllDto;
import wcs.backend.entities.Chat;
import wcs.backend.entities.Media;
import wcs.backend.entities.User;
import wcs.backend.repositories.ChatRepository;
import wcs.backend.repositories.MediaRepository;
import wcs.backend.repositories.UserRepository;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service

public class MediaService {
  @Autowired
  private final UserRepository userRepository;
  @Autowired
  private final ChatRepository chatRepository;
  @Autowired
  private final MediaRepository mediaRepository;
  @Autowired
  private final ModelMapper modelMapper;

  public MediaService(MediaRepository mediaRepository, ModelMapper modelMapper, UserRepository userRepository,
      ChatRepository chatRepository) {
    this.mediaRepository = mediaRepository;
    this.modelMapper = modelMapper;
    this.userRepository = userRepository;
    this.chatRepository = chatRepository;
  }

  public MediaDto uploadFile(MultipartFile file, Long userId, Long chatId) throws IOException {

    // Create Media entity with optional user and chat
    Media media = new Media();
    media.setFileName(file.getOriginalFilename());
    media.setContentType(file.getContentType());
    media.setData(file.getBytes());

    // Save the media entity first
    Media savedMedia = mediaRepository.save(media);
  // Set the URL directly
  savedMedia.setUrl("/api/media/" + savedMedia.getId() + "/content");
    if (userId != null) {
      // Check if there is an existing media with the same userId
      List<Media> existingMediaList = mediaRepository.findByUserId(userId);

      // If existing media is found, disassociate it from the user
      if (!existingMediaList.isEmpty()) {
        for (Media existingMedia : existingMediaList) {
          User associatedUser = existingMedia.getUser();
          if (associatedUser != null) {
            associatedUser.setMedia(null);
            userRepository.save(associatedUser);
          }
        }
        // Now delete the existing media
        mediaRepository.deleteAll(existingMediaList);
      }

      User user = userRepository.findById(userId).orElse(null);

      // Update the user with the saved media
      if (user != null) {
        user.setMedia(savedMedia);
        userRepository.save(user);
      }

      // Update the media with the user
      savedMedia.setUser(user);
      mediaRepository.save(savedMedia);
    }

    if (chatId != null) {
      Chat chat = chatRepository.findById(chatId).orElse(null);

      // Update the chat with the saved media
      if (chat != null) {
        chat.setMedia(savedMedia);
        chatRepository.save(chat);
      }

      // Update the media with the chat
      savedMedia.setChat(chat);
      mediaRepository.save(savedMedia);
    }

    return modelMapper.map(savedMedia, MediaDto.class);
  }

  public List<MediaGetAllDto> getAllMedia() {
    List<Media> mediaList = mediaRepository.findAll();
    return mediaList.stream()
        .map(media -> modelMapper.map(media, MediaGetAllDto.class))
        .collect(Collectors.toList());
  }

  public MediaDto getMediaById(Long id) {
    Optional<Media> optionalMedia = mediaRepository.findById(id);
    return optionalMedia.map(media -> modelMapper.map(media, MediaDto.class))
        .orElse(null);
  }



  public MediaDto getMediaContentById(Long id) {
    Optional<Media> optionalMedia = mediaRepository.findById(id);
    if (optionalMedia.isPresent()) {
        Media media = optionalMedia.get();
        byte[] data = media.getData();
        if (data != null) {
            String contentType = media.getContentType();

            MediaDto mediaDto = modelMapper.map(media, MediaDto.class);
            mediaDto.setBase64Content(Base64.getEncoder().encodeToString(data));
            mediaDto.setContentType(contentType);
            mediaDto.setUrl("/api/media/" + id + "/content");

            return mediaDto;
        }
    }
    return null;
}




  public List<MediaDto> getMediaByUserId(Long userId) {
    List<Media> userMediaList = mediaRepository.findByUserId(userId);
    return userMediaList.stream()
        .map(media -> modelMapper.map(media, MediaDto.class))
        .collect(Collectors.toList());
  }

  public List<MediaDto> getMediaByTicketId(Long ticketId) {
    List<Media> ticketMediaList = mediaRepository.findByChatId(ticketId);
    return ticketMediaList.stream()
        .map(ticket -> modelMapper.map(ticket, MediaDto.class))
        .collect(Collectors.toList());
  }

  public MediaDto addMedia(MediaDto mediaDto) {
    Media media = modelMapper.map(mediaDto, Media.class);
    Media savedMedia = mediaRepository.save(media);
    return modelMapper.map(savedMedia, MediaDto.class);
  }

  public void deleteMedia(Long id) {
    mediaRepository.deleteById(id);
  }

}
