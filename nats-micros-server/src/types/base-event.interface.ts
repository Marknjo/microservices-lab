import { ClientSubjects } from './client-subjects';

export interface Event {
  subject: ClientSubjects;
  data: any;
}
