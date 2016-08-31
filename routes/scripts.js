'use strict';

var express = require('express');
var router = express.Router();
var scripts = require('../scripts');
const crypto = require('crypto');


/* GET home page. */
router.get('/:scriptId', function(req, res, next) {
  scripts.get(req.params.scriptId).then(res.send.bind(res));
});

router.post('/', function(req, res, next) {
  const scriptBody = req.body;
  console.log('body:',scriptBody);
  const hash = crypto.createHash('sha256');
  hash.update(scriptBody);
  const scriptId = hash.digest('hex');
  res.setHeader('location', scriptId);
  scripts.put(scriptId, scriptBody);
  res.send(201);
});


module.exports = router;
