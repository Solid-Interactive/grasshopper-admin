/*global require*/
'use strict';

// Require.js allows us to configure shortcut alias
require.config({
    shim : {
        underscore : {
            exports : '_'
        },
        mocha : {
            exports : 'mocha'
        }
    },
    paths : {
        underscore : '../app/vendor/lodash/dist/lodash.underscore',
        jquery : '../app/vendor/jquery/jquery',
        backbone : '../app/vendor/backbone-amd/backbone',
        text : '../app/vendor/requirejs-text/text',
        mocha : '../app/vendor/mocha/mocha',
        chai : '../app/vendor/chai/chai',
        squire : '../app/vendor/squire/src/Squire',

        baseView : '../app/views/base/baseView'
    }
});

require([
    'mocha',
    './views/baseView'
], function (mocha) {
    mocha.setup('bdd');
    mocha.run();
});
