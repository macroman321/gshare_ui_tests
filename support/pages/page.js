export default class Page {
  constructor(client) {
    this.title = 'GShare';
    this.app = new Application({
      path: client,
    });
  }

  startClient() {
    this.app.start();
  }
}
