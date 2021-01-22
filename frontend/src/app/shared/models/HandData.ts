export class HandData {
  handType: string;
  frameIdentifier: number;
  data;

  constructor() {
    this.data = new Map<string, number>();
  }
}
