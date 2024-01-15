import { Media } from "./media.model";

export interface Chat {
  id: number;
  message: string;
  author: string;
  sent_date: Date;
  userId?: number;
  Media?: Media;
}
