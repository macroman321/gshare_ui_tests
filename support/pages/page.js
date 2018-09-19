function Page (world) {
  this.title = 'GShare'
  this.page = world.page
  this.app = world.app
}

Page.prototype.startClient = async function () {
  await this.app.start()
}

Page.prototype.stopClient = async function () {
  await this.app.stop()
}

module.exports = Page
