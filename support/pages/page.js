let world

function Page (_world) {
  if (!world) {
    if (_world) {
      world = _world
    }
  }

  this.title = 'GShare'
  this.world = world
  this.app = this.world.app
}

Page.prototype.startClient = async function () {
  await this.world.app.start()
}

Page.prototype.stopClient = async function () {
  await this.world.app.stop()
}

module.exports = Page
