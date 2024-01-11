export interface Media {
  id: number;
  fileName: string;
  contentType: string;
  url: string;
  userId?: number;
  chatId?: number;
}
