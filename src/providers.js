'use strict';
const Filesystem = require('./provider/Filesystem');
const Rackspace = require('./provider/Rackspace');
const S3 = require('./provider/S3');

const factory = {
  rackspace: function(file, backupConfig, providerConfig) {
    return new Rackspace(file, backupConfig, providerConfig);
  },
  filesystem: function(file, backupConfig, providerConfig) {
    return new Filesystem(file, backupConfig, providerConfig);
  },
  s3: function(file, backupConfig, providerConfig) {
    return new S3(file, backupConfig, providerConfig);
  }
};

module.exports = factory;
