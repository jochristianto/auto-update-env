#### Package
Go to [auto-update-env](hhttps://www.npmjs.com/package/auto-update-env)

#### Installation
`yarn add auto-update-env`

#### Usage

Create a file `envcheck.js` in your root directory. 
```
const autoUpdateEnv = require('auto-update-env');

const autoFix = process.argv.includes('-f') || process.argv.includes('--fix');
autoUpdateEnv.compare('.env', 'env.sample', autoFix);
```
Please change `.env` and `env.sample` accordingly.

Update your scripts in your `package.json` file to meet your requirement, for example:
```
  "scripts": {
    "envcheck": "node envcheck.js",
    "dev": "node envcheck.js --fix && backpack",
    "build-staging": "node envcheck.js --fix && nuxt build && backpack build",
  },
```

Once added, you can simply call it using `yarn envcheck`.

#### Options
| Flag     | Description                                                                     |
| -------- | ------------------------------------------------------------------------------- |
| `--fix`  | Automatically add the missing variable to your current .env                     |
| `-f`     | Shortcode for `--fix`                                                           |
