'use strict';
const EventEmitter = require('events').EventEmitter;

class Provider extends EventEmitter {
  constructor(file, config) {
    super(config);
    this.config = config;
    this.file = file;
    if (!this.config || !this.file) {
      this.error(new Error('A config and file is required.'));
      return this;
    }
    this.store();
  }
  store() {
    throw new Error('Store must be implemented in extending class.');
  }
  success() {
    this.emit('success', this.config);
    this.emit('done', this.config);
  }
  error(err) {
    this.emit('error', err, this.config);
    this.emit('done', this.config);
  }
}

Provider.rackspace = function(file, config) {
  const Rackspace = require('./Rackspace');
  return new Rackspace(file, config);
}

module.exports = Provider;
