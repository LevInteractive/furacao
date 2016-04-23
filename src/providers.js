const Rackspace = require('./provider/Rackspace');

const factory = {
  rackspace: function(file, config) {
    return new Rackspace(file, config);
  }
};

module.exports = factory;
