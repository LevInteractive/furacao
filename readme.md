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
# Run in the foreground.
furacao -c path/to/config.json

# Or run as a daemon in the background on system start.
```
