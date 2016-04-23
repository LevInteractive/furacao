# Furacao

For the people who like to store backups remotely to keep servers lean and
compartmental™.

## Installation

```bash
npm install -g furacao
```

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
```

You'll want to run this as a daemon on the OS so it's always in the background
and started on boot.

## Future

* Add more providers! AWS's, SFTP, local filesystem, ect...
* More robust frequencies. Specific times, ect.
