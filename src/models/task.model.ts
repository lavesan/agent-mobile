export class Task {
  id: string;
  title: string;
  description: string;
  isDone: boolean;

  constructor() {
    this.id = Date.now().toString();
    this.isDone = false;
  }
}
