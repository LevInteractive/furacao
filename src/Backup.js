'use strict';
const EventEmitter = require('events').EventEmitter;
const archiver = require('archiver');
const moment = require('moment');
const os = require('os');
const fs = require('fs');
const path = require('path');
const providers = require('./providers');

class Backup extends EventEmitter {
  constructor(backupConfig, providerConfig) {
    super();

    if (!backupConfig || !providerConfig) {
      throw new Error('Both a backup and provider config object is required.');
    }

    this.providerConfig = providerConfig;
    this.backupConfig = backupConfig;
    this.filename = `${backupConfig.name}-${moment().format()}.tar.gz`;
    this.tmpFile = path.join(os.tmpdir(), this.filename);
    process.nextTick(() => this.compress());
  }
  compress() {
    this.emit('compress', this.backupConfig);
    const archive = archiver('tar', {
      gzip: true,
      gzipOptions: {
        level: 1
      }
    });
    const output = fs.createWriteStream(this.tmpFile);
    archive.on('error', err => this.error(err));
    output.on('close', () => this.store());
    archive.pipe(output);
    archive.bulk([
      {
        expand: true,
        cwd: this.backupConfig.dir,
        src: this.backupConfig.glob || ['*/**']
      }
    ]);
    archive.finalize();
  }
  store() {
    this.emit('store', this.backupConfig);
    if (!providers[this.providerConfig.name]) {
      return this.error(new Error('The provider you provided does not exist.'));
    }
    providers[this.providerConfig.name](
      this.tmpFile,
      this.backupConfig,
      this.providerConfig
    )
      .on('success', () => this.success())
      .on('error', err => this.error(err))
    ;
  }
  success() {
    fs.unlink(this.tmpFile, () => {
      this.emit('success', this.backupConfig);
      this.emit('done');
    });
  }
  error(err) {
    fs.unlink(this.tmpFile, () => {
      this.emit('error', err, this.backupConfig)
      this.emit('done');
    });
  }
}

module.exports = Backup;
