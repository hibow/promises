/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var pluckFirstLine = require('./promiseConstructor.js').pluckFirstLineFromFileAsync;
var getProfile = require('./promisification.js').getGitHubProfileAsync;

var fetchProfileAndWriteToFile = (readFilePath, writeFilePath) => {
  return pluckFirstLine(readFilePath)
    .then((user) => {
      return getProfile(user);
    })
    .then ((profile) => {
      return new Promise((resolve, reject) => {
        fs.writeFile(writeFilePath, JSON.stringify(profile), (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
