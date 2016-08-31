'use strict';

var express = require('express');
var router = express.Router();
var scripts = require('../scripts');
const vm = require('vm');


/* GET home page. */
router.get('/execute/:scriptId', function(req, res, next) {
  const scriptId = req.params.scriptId;
  scripts.get(scriptId).then(script => {
    const result = vm.runInNewContext(script, {});
    res.json({scriptId:scriptId, script:script, result:result});
  });
});


module.exports = router;
