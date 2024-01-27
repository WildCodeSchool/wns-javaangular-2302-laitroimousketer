export interface TicketHistorical {
  id: number;
  ticketId: number;
  userId: number;
  userName: string;
  ticketTitle: string;
  action: string;
  timestamp: Date;
  read: boolean;
}
