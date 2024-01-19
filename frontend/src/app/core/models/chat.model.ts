import { Media } from "./media.model";
import { User } from "./user.model";

export interface Chat {
  id: number;
  message: string;
  author: User;
  sent_date: Date;
  userId?: number;
  media: Media | null;
}
