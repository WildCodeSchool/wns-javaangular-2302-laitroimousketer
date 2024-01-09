package wcs.backend.model;

public class FileInfo {
  private String name;
  private String url;
  private Long userId;
  private Long chatId;

  public FileInfo(String name, String url, Long userId, Long chatId) {
    this.name = name;
    this.url = url;
    this.userId = userId;
    this.chatId = chatId;
    
  }

  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getUrl() {
    return this.url;
  }

  public void setUrl(String url) {
    this.url = url;
  }

  public Long getUserId() {
    return this.userId;
  }

  public void setUserId(Long userId) {
    this.userId = userId;
  }

  public Long getChatId() {
    return this.chatId;
  }
  
  public void setChatId(Long chatId) {
    this.chatId = chatId;
  }
}
