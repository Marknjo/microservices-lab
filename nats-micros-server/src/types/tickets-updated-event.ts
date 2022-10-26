import { ClientSubjects } from './client-subjects';

export interface TickerUpdatedEvent {
  subject: ClientSubjects.TicketUpdated;
  data: {
    id: string;
    title: string;
    price: number;
  };
}
