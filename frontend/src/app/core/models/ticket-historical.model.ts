export interface TicketHistorical {
  id: number;
  ticketId: number;
  userId: number;
  authorName: string;
  ticketTitle: string;
  action: string;
  timestamp: Date;
  read: boolean;
}
