import { Ingredient } from '../shared/ingredient.model';

export class Legend {
  public type: string;
  public size: string;
  public uuid: string;
  public eventdate: string;
  public detail: string;
  public summary: string;







  constructor(type: string, size: string, uuid: string, eventdate: string, detail: string, summary: string) {
    this.summary = summary;
    this.type = type;
    this.size = size;
    this.uuid = uuid;
    this.eventdate = eventdate;
    this.detail = detail;
    this.summary = summary;

  }
}
