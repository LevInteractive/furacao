const Rackspace = require('./provider/Rackspace');

const factory = {
  rackspace: function(file, backupConfig, providerConfig) {
    return new Rackspace(file, backupConfig, providerConfig);
  }
};

module.exports = factory;
