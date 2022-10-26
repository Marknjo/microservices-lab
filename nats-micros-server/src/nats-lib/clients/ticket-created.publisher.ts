import { Publisher } from '../core/base-publisher';
import { ClientSubjects } from '../types/client-subjects.enum';
import { TicketCreatedEvent } from '../types/ticker-created-event.interface';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: ClientSubjects.TicketCreated =
    ClientSubjects.TicketCreated;
}
