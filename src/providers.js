'use strict';
const Filesystem = require('./provider/Filesystem');
const Rackspace = require('./provider/Rackspace');

const factory = {
  rackspace: function(file, backupConfig, providerConfig) {
    return new Rackspace(file, backupConfig, providerConfig);
  },
  filesystem: function(file, backupConfig, providerConfig) {
    return new Filesystem(file, backupConfig, providerConfig);
  }
};

module.exports = factory;
