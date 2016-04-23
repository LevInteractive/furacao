'use strict';
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const Provider = require('./Provider');

class Filesystem extends Provider {
  store() {
    const parts = path.parse(this.file);
    const dest = path.join(
      this.providerConfig.destination,
      this.backupConfig.name
    );
    mkdirp(dest, (err) => {
      if (err) {
        return this.error(err);
      }
      const source = fs.createReadStream(this.file);
      const output = fs.createWriteStream(path.join(dest, parts.base));
      source.on('error', err => this.error(err));
      source.on('close', () => this.success());
      source.pipe(output);
    });
  }
}

module.exports = Filesystem;
