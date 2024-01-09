package wcs.backend.controllers;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import wcs.backend.dtos.MediaDto;
import wcs.backend.dtos.MediaGetAllDto;
import wcs.backend.services.MediaService;

import java.io.IOException;
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
      @RequestParam(value = "chatId", required = false) Long chatId
  ) throws IOException {
      MediaDto mediaDto = mediaService.uploadFile(file, userId, chatId);
      return ResponseEntity.ok(mediaDto);
  }
  

  @GetMapping("{id}")
  public ResponseEntity<byte[]> downloadFile(@PathVariable Long id) throws IOException {
    byte[] mediaContent = mediaService.getMediaContentById(id);
    MediaDto mediaDto = mediaService.getMediaById(id); // Fetch MediaDto

    if (mediaDto != null) {
      return ResponseEntity.ok()
          .contentType(MediaType.parseMediaType("application/octet-stream"))
          .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + mediaDto.getFileName() + "\"")
          .body(mediaContent);
    } else {
      // Handle the case where mediaDto is not found
      return ResponseEntity.notFound().build();
    }

  }
}