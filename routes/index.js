'use strict';

var express = require('express');
var router = express.Router();
var scripts = require('../scripts');
const vm = require('vm');

function contextFromQuery(query) {
    let contextFromUrl = Object.keys(query).reduce((context, key) => {
        let value = query[key];
        if (/-?\d+/.test(value)) {
            value = parseInt(value);
        }
        context[key] = value;
        return context;
    }, {});

    return vm.createContext(contextFromUrl);
}

/* GET home page. */
router.get('/execute/:scriptId', function (req, res, next) {
    const scriptId = req.params.scriptId;
    scripts.get(scriptId).then(script => {
        const context = contextFromQuery(req.query);

        console.log('context', context);
        const result = vm.runInContext(script, context)('banana');
        res.json({
            scriptId: scriptId,
            script: script,
            result: result
        });
    });
});


module.exports = router;