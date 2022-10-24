import { ClientSubjects } from './client-subjects';

export interface TicketCreatedEvent {
  subject: ClientSubjects.TicketCreated;
  data: {
    id: string;
    title: string;
    price: number;
  };
}
