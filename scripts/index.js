'use strict';

const Promise = require('bluebird');
const path = require('path');
const fs = Promise.promisifyAll(require('fs'));

const contentPath = process.env.USER_SCRIPTS_PATH || path.join(process.cwd(), 'user_content', 'scripts');

function pathToId(id){
  return path.join(contentPath, id);
}
module.exports.get = function(id){
  return fs.readFileAsync(pathToId(id), 'utf8');
}
module.exports.put = function(id, body){
  fs.writeFile(pathToId(id), body);
}