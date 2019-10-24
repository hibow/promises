/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var request = require('request');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, callback) {
  const rs = fs.createReadStream(filePath, {encoding: 'utf8'});
  let index;
  let body = '';
  let loc = 0;
  rs.on('data', chunk => {
    index = chunk.indexOf('\n');
    body += chunk;
    if (index === -1) {
      loc = chunk.length;
    } else {
      loc = index;
      rs.close();
    }
  })
    .on('close', () => callback(null, body.slice(body.charCodeAt(0) === 0xFEFF ? 1 : 0, loc)))
    .on('error', err => callback(err, null));
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (url, callback) {
  request(url, function(error, response, body) {
    if (error) {
      callback(error, null);
    } else {
      callback(null, (response && response.statusCode));
    }
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
