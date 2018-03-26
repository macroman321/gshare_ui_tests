function Page(app) {
  console.log('Page constructor');
  this.title = 'GShare';
  this.app = app
}

Page.prototype.startClient = function() {
  this.app.start();
}

Page.prototype.stopClient = function() {
  this.app.stop();
}

module.exports = Page;
