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

exports.create = (text, callback) => {
  counter.getNextUniqueId(
    // This function is the callback in getNextUniqueId()
    function(err, string){ //its a thing
      // Generates unique ID, for each file
      var id = string;
      items[id] = text;

      // Create a new file, for each todo
      // Should save todo text content in each file
      //fs.writeFile(`.datastore/data/${id}.txt`, text, (err) => {
      fs.writeFile(`.datastore/data/${id}.txt`, id, (err) => {
        if (err) {
          throw ('error creating file');
        } //else {
          //callback(null, {id: id, text: text});
        //}
      });
      callback(null, {id: id, text: text});  // For front end's updating
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
