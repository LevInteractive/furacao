'use strict';
const pkgcloud = require('pkgcloud');
const fs = require('fs');
const path = require('path');
const Provider = require('./Provider');

class Rackspace extends Provider {
  client() {
    return pkgcloud.storage.createClient({
      provider: 'rackspace',
      username: this.providerConfig.username,
      apiKey: this.providerConfig.apikey,
      region: this.providerConfig.region
    });
  }
  store() {
    const client = this.client();
    const source = fs.createReadStream(this.file);
    const parts = path.parse(this.file);
    const dest = client.upload({
      container: this.providerConfig.container,
      remote: `${this.backupConfig.name}/${parts.base}`
    });
    dest.on('error', (err) => this.error(err));
    dest.on('success', () => this.success());
    source.pipe(dest);
  }
}

module.exports = Rackspace;
