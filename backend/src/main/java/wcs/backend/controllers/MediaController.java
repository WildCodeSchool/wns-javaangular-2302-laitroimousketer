package wcs.backend.controllers;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import wcs.backend.dtos.MediaDto;
import wcs.backend.dtos.MediaGetAllDto;
import wcs.backend.services.MediaService;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping("/api/media/")
public class MediaController {

  private final MediaService mediaService;

  public MediaController(MediaService mediaService) {
    this.mediaService = mediaService;
  }

  @GetMapping
  public ResponseEntity<List<MediaGetAllDto>> getAllMedia() {
    List<MediaGetAllDto> allMedia = mediaService.getAllMedia();
    return ResponseEntity.ok(allMedia);
  }

  @PostMapping("upload")
  public ResponseEntity<MediaDto> uploadFile(
      @RequestParam("file") MultipartFile file,
      @RequestParam(value = "userId", required = false) Long userId,
      @RequestParam(value = "chatId", required = false) Long chatId) throws IOException {
    MediaDto mediaDto = mediaService.uploadFile(file, userId, chatId);
    return ResponseEntity.ok(mediaDto);
  }

  @GetMapping("{id}")
  public ResponseEntity<MediaDto> getMediaById(@PathVariable Long id) {
    MediaDto mediaDto = mediaService.getMediaById(id);
    return mediaDto != null ? ResponseEntity.ok(mediaDto) : ResponseEntity.notFound().build();
  }

  @GetMapping("file/{id}")
  public ResponseEntity<byte[]> downloadMedia(@PathVariable Long id) {
      MediaDto mediaContent = mediaService.getMediaContentById(id);
  
      if (mediaContent != null) {
          HttpHeaders headers = new HttpHeaders();
          headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
          headers.setContentDispositionFormData("attachment", "media-" + id);
          return new ResponseEntity<>(Base64.getDecoder().decode(mediaContent.getBase64Content()), headers, HttpStatus.OK);
      } else {
          return ResponseEntity.notFound().build();
      }
  }
  

}