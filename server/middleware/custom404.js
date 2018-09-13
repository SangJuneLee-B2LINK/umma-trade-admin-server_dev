'use strict';
module.exports = function () {
    var path = require('path');
    return function urlNotFound(req, res, next) {
        let angular_index = path.resolve('client/dist/umma-trade-client-desktop/index.html');
        res.sendFile(angular_index, function (err) {
            if (err) {
                console.error(err);
                res.status(err.status).end();
            }
        });
    };
};