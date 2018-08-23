const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

var counter = 0;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      callback(null, 0);
    } else {
      callback(null, Number(fileData));
    }
  });
};

const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////
// O (output): an ID, by using CPS in the function
// Note: no need to add error handling for this function
exports.getNextUniqueId = (cb) => {
  // First, read the current counter
  readCounter(
    // This function is the callback inside readCounter()
    // It should give the next id, based on the count in the file
    function(err, count) {
      // Use error-first callback pattern
      if (err) {  // If no file exists
        console.log("error!");
        cb(err, 0);
      } else { // If file already exists
        writeCounter(count + 1,
          // This function is the callback function inside writeCounter()
          function(err, counterString){
            if (err) {
            console.log("theres an error writing counter!");
            } else {
              cb(err, counterString);
            }
          }
        );
      }
    }
  );
  
};



// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');
