'use strict';
const fs = require('fs');
const path = require('path');
const async = require('async');
const log = require('./log');
const Backup = require('./Backup');
const argv = require('minimist')(process.argv.slice(2), {
  alias: {
    config: ['c']
  }
});

if (!argv.config) {
  log.error('A config file is required.');
  process.exit(1);
}

const actions = {
  start: (info) => {
    log.info(`Started backing up ${info.name} (${info.dir}).`);
  },
  compress: () => {
    log.info('Compressing directory in to file.');
  },
  store: () => {
    log.info('Storing file.');
  },
  error: (err, data) => {
    log.error(
      `There was an error backing up ${data.config}!`,
      err.toString()
    );
  },
  success: (data, err) => {
    log.info(`${data.name} backed up successfully.`);
  }
};

function getConfig() {
  let config;
  try {
    config = JSON.parse(
      fs.readFileSync(path.resolve(process.cwd(), argv.config), 'utf8')
    );
  } catch (err) {
    if (err.code === 'ENOENT') {
      log.error('Config file does not exist.');
    } else {
      log.error('There was an error reading the config file:', err);
    }
    process.exit(1);
  }
  return config;
}

function reschedule(err) {
  const config = getConfig();
  if (err) {
    log.warn('There were error(s) during backup.');
  }
  setTimeout(run, config.frequency);
};

function run() {
  const config = getConfig();
  const iteratee = function(data, callback) {
    return new Backup(data, config.provider)
      .on('start', actions.start)
      .on('compress', actions.compress)
      .on('store', actions.store)
      .on('error', actions.error)
      .on('success', actions.success)
      .on('done', callback)
    ;
  };
  async.eachSeries(config.backups, iteratee, reschedule);
}

run();
