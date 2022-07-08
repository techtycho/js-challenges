export default class Task {
  static count = 0;

  constructor(body) {
    this.body = body;
    this.focus = false;

    // Determine ID
    this.id = Task.count;
    Task.count++;
  }
}
