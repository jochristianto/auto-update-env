const fs = require('fs');
const dotenv = require('dotenv');
const consola = require('consola');

const timeToWrite = () => {
  const m = new Date();
  // const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  // const m = new Date(utc + (3600000 * 7));

  return `${m.getFullYear()}-${
    (`0${m.getMonth() + 1}`).slice(-2)}-${
    (`0${m.getDate()}`).slice(-2)} ${
    (`0${m.getHours()}`).slice(-2)}:${
    (`0${m.getMinutes()}`).slice(-2)}:${
    (`0${m.getSeconds()}`).slice(-2)} (Local Time)`;
};

exports.compare = (autoFix = false, sourceFile = '.env.sample', targetFile = '.env') => {
  const source = dotenv.config({ path: sourceFile }).parsed;
  let target = dotenv.config({ path: targetFile }).parsed;

  // Check for source file
  if (typeof source === 'undefined') {
    consola.error('Source config file is not found: ' + sourceFile);
    return process.exit(1);
  }

  // Check for target file
  if (typeof target === 'undefined') {
    consola.error('Target config file is not found: ' + targetFile);
    return process.exit(1);
  }

  // Print out information whether flag -f is given
  if (!autoFix) {
    consola.info('Auto Add is Disabled');
  } else {
    consola.info('Auto Add is Enabled');
  }

  consola.info(`Comparing "${targetFile}" with "${sourceFile}"`);

  // Populating env keys
  const newLines = [];
  Object.keys(source).forEach(key => {
    if (typeof target[key] === 'undefined') {
      newLines.push(`${key}=${source[key]}`);
    }
  });

  if (!autoFix) {
    // Print out keys that doesn't exist on the other side
    if (newLines.length >= 1) {
      consola.success(`The following variables are not listed in your ${targetFile} file:`);
      newLines.forEach(newLine => {
        consola.log(`  - ${newLine}`);
      });

      return process.exit(0);
    }
  } else {
    // Add the keys that doesn't exist on the other side to the target file
    if (newLines.length >= 1) {
      consola.success(`The following variables are added to your your ${targetFile} file:`);
      fs.appendFileSync(targetFile, `\n# [AUE] ${timeToWrite()}\n`);
      newLines.forEach(newLine => {
        consola.log(`  - ${newLine}`);
        fs.appendFileSync(targetFile, `${newLine}\n`);
      });

      return process.exit(0);
    }
  }
};
