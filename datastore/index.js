const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

// exports.create = (text, callback) => {
//   // var id = counter.getNextUniqueId();  // Temporarily commented out
//   var id = 'hahaha';
//   items[id] = text;

//   callback(null, {id: id, text: text});

// // fs.writeFile('./sample.txt', (err) => {
// //   if (err) {
// //     throw ('error creating file');
// //   } else {
// //     callback(null, id);
// //   }
// // });
//   fs.writeFile('./datastore/sample.txt', id);
// };

// Note: callback functions are Not loop inside loop; they are just triggered by one another
exports.create = (text, callback) => {  // For ES6, {} is more general-purpose than ()
  // Step 1: get unique ID, for each file name
  counter.getNextUniqueId(
    // This function is the callback in getNextUniqueId()
    function(err, string){
      // Generates unique ID, for each file
      var id = string;
      items[id] = text;

      // Step 2: create a new file, for each todo
      // Step 3: should save todo text content in each file (saved as 'text')
      fs.writeFile(`./datastore/data/${id}.txt`, text, (err) => {
        if (err) {
          console.log('error creating file');  // Don't use throw (big exit) here
        } //else {
          //callback(null, {id: id, text: text});
        //}
      });
      // Step 4: update front end, with new object
      callback(null, {id: id, text: text});
    }
  );
  
}
//`string you want to to add a ${variable} into`

exports.readOne = (id, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback(null, {id: id, text: item});
  }
};

exports.readAll = (callback) => {
  var data = [];
  _.each(items, (item, idx) => {
    data.push({ id: idx, text: items[idx] });
  });
  callback(null, data);
};

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, {id: id, text: text});
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if(!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`))
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
