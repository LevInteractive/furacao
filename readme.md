# Furacao

For the people who like to store backups remotely to keep servers lean and
compartmental™.

[[http://9bc29d6865d09a60203d-f02a0efa1e5b120d5065a345250db3ff.r15.cf1.rackcdn.com/example.gif]]

## Installation

```bash
npm install -g furacao
```

## Options

* `--config` (`-c`): Required. The configuration file. Can be relative or absolute.
* `--onetime`: This will ignore the frequency property in the configuration file and the script will exit upon backing up. Suitable for using with a third-party program like cron to manage the schedule.

## Setup

It's a two step process.

#### Step 1: Create a configuration file.

At the moment, the only provider is for Rackspace Cloud Files. The Rackspace
provider will organize backups in neatly organized folders based on the backup's
`name`.

```json
{
  "frequency": 3600000,
  "provider": {
    "name": "rackspace",
    "container": "<container-name>",
    "apikey": "<api-key>",
    "username": "<username>"
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

#### Step 2: Run furacao

It's important to note that you don't need to re-run furacao after you make a
change to the configuration file. It will read changes on the fly.

```bash
furacao -c path/to/config.json

# You can also make it exit after calling using the --onetime flag. This will
# ignore the frequency property in the configuration file.
furacao -c path/to/config.json --onetime
```

You'll want to run this as a daemon on the OS so it's always in the background
and started on boot.

Here is an example of how a cronjob could look if you want to let cron back your
files up every day at midnight.

```bash
00 00 * * * furacao -c /home/dev/furacao.json --onetime
```

## Future

* Add more providers! AWS's, SFTP, local filesystem, ect...
* More robust frequencies. Specific times, ect.
