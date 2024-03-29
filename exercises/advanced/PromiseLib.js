// You should only use the `new Promise` constructor from bluebird
var Promise = require('bluebird');

/**
 * Return a function that wraps `nodeStyleFn`. When the returned function is invoked,
 * it will return a promise which will be resolved or rejected, depending on
 * the execution of the now-wrapped `nodeStyleFn`
 *
 * In other words:
 *   - If `nodeStyleFn` succeeds, the promise should be resolved with its results
 *   - If nodeStyleFn fails, the promise should be rejected with the error
 *
 * Because the returned function returns a promise, it does and should not
 * expect a callback function as one of its arguments
 */

var promisify = function(nodeStyleFn) {
  //when the return function invoked?
  return function(...args) { //input
    //console.log('arg', args);
    return new Promise (function (resolve, reject) {
      var callback = function(err, result) {
        if (err) {
          //console.log('err', err);
          reject(err);
        }
        if (result) {
          //console.log('result', Buffer.from(result).toString());
          resolve(Buffer.from(result));
        }
      };
      args.push(callback);
      //console.log('args', args);
      nodeStyleFn.apply(this, args);
    });
  };
};


/**
 * Given an array which contains promises, return a promise that is
 * resolved if and when all the items in the array are resolved.
 *
 * The promise's resolve value should be an array that maps to the
 * respective positions in the original array of promises.
 *
 * If any promise in the array rejects, the returned promise
 * is rejected with the rejection reason.
 */

var all = function(arrayOfPromises) {
  var results = [];
  return new Promise ( function(resolve, reject) {
    arrayOfPromises.forEach( function( item, index) {
    //  console.log('item', item);
      item
        .then ( function(result) {
          //console.log('result', result);
          results.push(result);
          if (results.length === arrayOfPromises.length) {
            //console.log('yes', results);
            return resolve(results);
          }
        })
        .catch( function (err) {
          //console.log('err--->', err);
          return reject(err);
        });
    });
  });
};


/**
 * Given an array of promises, return a promise that is resolved or rejected,
 * resolving with whatever the resolved value or rejection reason was from
 * the first to be resolved/rejected promise in the passed-in array
 */

var race = function(arrayOfPromises) {
//return the first returned promise
  return new Promise( function(resolve, reject) {
    arrayOfPromises.forEach( function(item, index) {
      item
        .then( function(result) {
          // console.log('result--->', result);
          return resolve(result);
        })
        .catch( function(err) {
          //console.log('err --->', err);
          return reject(err);
        });
    });
  });
};

// Export these functions so we can unit test them
module.exports = {
  all: all,
  race: race,
  promisify: promisify
};
