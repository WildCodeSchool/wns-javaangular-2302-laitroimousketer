export interface UserHistorical {
  id: number;
  userId: number;
  ticketId: number;
  ticketTitle: string;
  authorName: string;
  action: string;
  timestamp: Date;
  read: boolean;
}
