import { ClientSubjects } from './client-subjects.enum';

export interface Event {
  subject: ClientSubjects;
  data: any;
}
