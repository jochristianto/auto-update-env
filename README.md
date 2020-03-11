# auto-update-env
[![NPM](https://nodei.co/npm/auto-update-env.png)](https://nodei.co/npm/auto-update-env/)

![dependencies-status](https://david-dm.org/jochristianto/auto-update-env.svg)

![dependencies-status](https://david-dm.org/jochristianto/auto-update-env/dev-status.svg)

[![npm version](https://badge.fury.io/js/auto-update-env.svg)](https://badge.fury.io/js/auto-update-env) 
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=102)](https://github.com/jochristianto/auto-update-env/)

#### Installation

``` bash
# If you are using Yarn
$ yarn add auto-update-env --dev

# If you are using NPM
$ npm install auto-update-env --save-dev
``` 

#### Usage

> To make sure that this module run properly, make sure you add the required files beforehand.

1. Create a file `envcheck.js` in your root directory.

    ``` bash
    # Load the package
    const aue = require('auto-update-env');

    # (Optional) Check whether the command include auto-add command
    const flag =  process.argv.includes('-f') || process.argv.includes('--fix');

    # In this case, .env.sample is the source file and
    # .env is the target file. Please update it accordingly.
    aue.compare(flag, '.env.sample', '.env');
    ```

2. Update your scripts in your `package.json` file to meet your requirement, for example:
    ``` bash
    "scripts": {
      "envcheck": "node envcheck.js",
    },
    ```

    Once added, you can simply call it using `yarn envcheck` or `npm run envcheck`.

#### Options

| Flag     | Description | Usage Example |
| -------- | ----------- | ------------- |
| `--fix` | Automatically add the missing variable to your current .env | `yarn envcheck --fix` |
| `-f` | Shortcode for `--fix` | `yarn envcheck -f` |

### Version History
| Version   | Description |
| --------- | ----------- |
| 1.0.0     | Includes update to the code implementation. Now you can leave the default filenames empty. The label on the added keys are now changed from `[auto-update-env]` to `[aue]` followed by local time. |
| 0.0.5     | Added the UTC+0700 time to the label of the newly added keys. |

