let app

function Page (_app) {
  if (!app) {
    if (_app) {
      app = _app
    }
  }

  this.title = 'GShare'
  this.app = app
}

Page.prototype.startClient = async function () {
  await this.app.start()
}

Page.prototype.stopClient = async function () {
  await this.app.stop()
}

module.exports = Page
