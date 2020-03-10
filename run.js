const fs = require('fs');
const dotenv = require('dotenv');
const consola = require('consola');

const timeToWrite = () => {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const m = new Date(utc + (3600000 * 7));

  return `${m.getFullYear()}-${
    (`0${m.getMonth() + 1}`).slice(-2)}-${
    (`0${m.getDate()}`).slice(-2)} ${
    (`0${m.getHours()}`).slice(-2)}:${
    (`0${m.getMinutes()}`).slice(-2)}:${
    (`0${m.getSeconds()}`).slice(-2)} WIB`;
};

exports.compare = (autoFix = false, targetFile = '.env', sourceFile = '.env.sample') => {
  const source = dotenv.config({ path: sourceFile }).parsed;
  let target = dotenv.config({ path: targetFile }).parsed;

  if (typeof source === 'undefined') {
    consola.error('Source config file is not found: ' + sourceFile);
    return process.exit(0);
  }


  if (typeof target === 'undefined') {
    consola.error('Target config file is not found: ' + targetFile);
    return process.exit(0);
  }

  consola.info(`Comparing "${targetFile}" with "${sourceFile}"`);

  const newLines = [];
  Object.keys(source).forEach(key => {
    if (typeof target[key] === 'undefined') {
      newLines.push(`${key}=${source[key]}`);
    }
  });

  if (!autoFix) {
    consola.info('Auto Add is Disabled');
    if (newLines.length >= 1) {
      consola.success(`The following variable is not listed in your ${targetFile} file:`);
      newLines.forEach(newLine => {
        consola.log(`  - ${newLine}`);
      });

      return process.exit(1);
    }

    consola.success('Success');

    return process.exit(0);
  } else {
    consola.info('Auto Add is Enabled');
    if (newLines.length >= 1) {
      consola.success(`The following variable is not listed in your ${targetFile} file and will be added to the list:`);
      fs.appendFileSync(targetFile, `\n# [auto-update-env] ${timeToWrite()}\n`);
      newLines.forEach(newLine => {
        consola.log(`  - ${newLine}`);
        fs.appendFileSync(targetFile, `${newLine}\n`);
      });
    }
  }
};
