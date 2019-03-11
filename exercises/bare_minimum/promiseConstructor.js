/**
 * Implement these promise-returning functions.
 * Any successful value should be made available in the next `then` block chained
 * to the function invocation, while errors should be available in the `catch` block
 */

var fs = require('fs');
var request = require('request');
var Promise = require('bluebird');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFileAsync = function(filePath) {
  return new Promise( function(resolve, reject) {
    //readFile 
    fs.readFile(filePath, 'utf8', function(err, line, next) {
      if (err) {
        reject(err);
      } else {
        let index = line.indexOf('\n');
        let loc = 0;
        if (index === -1) {
          loc = line.length;
        } else {
          loc = index;
        }
        resolve(line.slice(line.charCodeAt(0) === 0xFEFF ? 1 : 0, loc));
      }
    });
  });
};

//Q: where to put then and catch?

// This function should retrieve the status code of a GET request to `url`
var getStatusCodeAsync = function(url) {
  return new Promise(function(resolve, reject, next) {
    request(url, function(err, response) {
      if (err) {
        reject(err);
      } else {
        resolve(response && response.statusCode);
      }
    });
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCodeAsync: getStatusCodeAsync,
  pluckFirstLineFromFileAsync: pluckFirstLineFromFileAsync
};
