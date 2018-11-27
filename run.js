const fs = require('fs');
const dotenv = require('dotenv');

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

exports.compare = (envFile = '.env', envSampleFile = 'env.sample', autoFix = false) => {
  const current = dotenv.config({ path: envFile }).parsed;
  const predefined = dotenv.config({ path: envSampleFile }).parsed;

  const caption = `Comparing "${envFile}" with "${envSampleFile}"`;
  const newLines = [];

  Object.keys(predefined).forEach(key => {
    if (!current[key]) {
      newLines.push(`${key}=${predefined[key]}`);
    }
  });

  if (!autoFix) {
    if (newLines.length >= 1) {
      console.log();
      console.log('\x1b[0;31m%s\x1b[0m', '✓ FAILED', caption);
      console.log(`  The following variable is not listed in your ${envFile} file:`);
      newLines.forEach(newLine => {
        console.log(`  - ${newLine}`);
      });
      console.log();

      return process.exit(1);
    }

    console.log();
    console.log('\x1b[0;32m%s\x1b[0m', '✓ SUCCESS', caption);
    console.log();

    return process.exit(0);
  }

  console.log('\x1b[0;33m%s\x1b[0m', '✨ AUTOFIX', caption);

  if (newLines.length >= 1) {
    fs.appendFileSync(envFile, `\n# [auto-update-env] ${timeToWrite()}\n`);
    newLines.forEach(newLine => {
      fs.appendFileSync(envFile, `${newLine}\n`);
    });
  }

  return process.exit(0);
};
