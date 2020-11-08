export class HandData {
  handType: string;
  frameIdentifier: number;
  data: Map<string, number>;

  constructor() {
    this.data = new Map<string, number>();
  }
}
