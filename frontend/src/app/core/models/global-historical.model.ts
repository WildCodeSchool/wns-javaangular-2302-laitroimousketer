export interface GlobalHistorical {
  id: number;
  ticketId: number;
  userId: number;
  ticketTitle: string;
  action: string;
  userName: string;
  timestamp: Date;
  read: boolean;
}
