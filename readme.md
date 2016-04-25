# Furacao

For the people who like to store backups remotely to keep servers lean and
compartmental™. For those who like to store on the same server - it can do that
too.

![Alt demo](http://9bc29d6865d09a60203d-f02a0efa1e5b120d5065a345250db3ff.r15.cf1.rackcdn.com/example.gif)

# Installation

```bash
npm install -g furacao
```

# Options

* `--config` (`-c`): Required. The configuration file. Can be relative or absolute.
* `--onetime`: This will ignore the frequency property in the configuration file and the script will exit upon backing up. Suitable for using with a third-party program like cron to manage the schedule.

The end result will be an organized directory structure:

```
<backup-name>
|  <backup-name>-<year>-<month>-<day>--<hour>-<minute>-<second>-<period>.tar.gz
|  <backup-name>-<year>-<month>-<day>--<hour>-<minute>-<second>-<period>.tar.gz
|  <backup-name>-<year>-<month>-<day>--<hour>-<minute>-<second>-<period>.tar.gz
|  ...
<backup-name>
|  ...
```

# Setup

It's a two step process.

### Step 1: Create a configuration file.

```json
{
  "frequency": 3600000,
  "provider": {
    "... SEE BELOW FOR PROVIDER INFO ..."
  },
  "backups": [
    {
      "name": "name-of-project",
      "dir": "path/to/dir",
      "glob": ["**/*", "!**/node_modules/**"]
    },
    {
      "name": "name-of-another",
      "dir": "path/to/dir/again",
      "glob": ["**/*", "!**/bower_components/**", "!**/.git/**"]
    }
  ]
}
```

##### Providers

###### Filesystem

```json
"provider": {
  "name": "filesystem",
  "destination": "<folder-name>"
}
```

###### Amazon S3 Storage

```json
"provider": {
  "name": "s3",
  "container": "<container-name>",
  "secretkey": "<secret-key>",
  "accesskey": "<access-key-id>",
  "region": "<region>"
}
```

###### Rackspace Cloud Files

```json
"provider": {
  "name": "rackspace",
  "container": "<container-name>",
  "apikey": "<api-key>",
  "username": "<username>",
  "region": "<region>"
}
```

### Step 2: Run furacao

Start furacao.

```bash
# Run in the foreground.
furacao -c path/to/config.json

# Run in the background.
nohup furacao -c path/to/config.json &

# You can also make it exit after calling using the --onetime flag. This will
# ignore the frequency property in the configuration file.
furacao -c path/to/config.json --onetime

# Here is an example of how a cronjob could look if you want to let cron back your
# files up every day at midnight.
# *Note* make sure you furacao is accessible to cron user.
00 00 * * * furacao -c /home/dev/furacao.json --onetime
```

Basically, you'll want to run this as a daemon on the OS so it's always in the
background and started on boot. If you want to keep it all node.js, you could
also use [forever.js](https://github.com/foreverjs/forever).

It's important to note that you don't need to re-run furacao after you make a
change to the configuration file. It will read changes on the fly.
