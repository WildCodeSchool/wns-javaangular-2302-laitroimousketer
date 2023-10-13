package wcs.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import wcs.backend.dtos.ChatDto;
import wcs.backend.entities.Chat;

@Mapper(componentModel = "spring")
public interface ChatMapper {

    @Mapping(target = "id", source = "chatId")
    @Mapping(target = "message", source = "message")
    @Mapping(target = "sender", source = "sender")
    @Mapping(target = "receiver", source = "receiver")
    @Mapping(target = "timestamp", source = "timestamp")
    ChatDto chatToChatDto(Chat chat);

    @Mapping(target = "chatId", source = "id")
    @Mapping(target = "message", source = "message")
    @Mapping(target = "sender", source = "sender")
    @Mapping(target = "receiver", source = "receiver")
    @Mapping(target = "timestamp", source = "timestamp")
    Chat chatDtoToChat(ChatDto chatDto);

}
