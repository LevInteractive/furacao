'use strict';
const EventEmitter = require('events').EventEmitter;

class Provider extends EventEmitter {
  constructor(file, backupConfig, providerConfig) {
    super();
    this.file = file;
    this.backupConfig = backupConfig;
    this.providerConfig = providerConfig;

    if (!this.backupConfig || !this.file || !this.providerConfig) {
      this.error(new Error('Missing required arguments for provider.'));
      return this;
    }

    this.store();
  }
  store() {
    throw new Error('Store must be implemented in extending class.');
  }
  success() {
    this.emit('success');
    this.emit('done');
  }
  error(err) {
    this.emit('error', err);
    this.emit('done');
  }
}

module.exports = Provider;
