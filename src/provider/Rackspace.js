'use strict';
const pkgcloud = require('pkgcloud');
const fs = require('fs');
const path = require('path');
const Provider = require('./Provider');

class Rackspace extends Provider {
  constructor(file, config) {
    super(file, config);
  }
  client() {
    return pkgcloud.storage.createClient({
      provider: 'rackspace',
      username: this.config.username,
      apiKey: this.config.apikey,
      region: this.config.region
    });
  }
  store() {
    const client = this.client();
    const source = fs.createReadStream(this.file);
    const dest = client.upload({
      container: this.config.container,
      remote: path.parse(this.file).base
    });
    dest.on('error', (err) => this.error(err));
    dest.on('success', () => this.success());
    source.pipe(dest);
  }
}

module.exports = Rackspace;
