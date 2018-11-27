#### Installation
`yarn add auto-update-env`

#### Usage

```
const autoUpdateEnv = require('auto-update-env');
const autoFix = process.argv.includes('-f') || process.argv.includes('--fix');
const res = autoUpdateEnv.compare('.env', 'env.sample', autoFix);
```
