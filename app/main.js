/*global require*/
// Require.js allows us to configure shortcut alias
require.config({
    shim : {
        base64 : {
            exports : 'Base64'
        },
        alerts : {
            deps : ['foundation']
        },
        dropdown : {
            deps : ['foundation']
        },
        tabs : {
            deps : ['foundation']
        },
        tooltip : {
            deps : ['foundation']
        },
        abide : {
            deps : ['foundation']
        },
        foundation : {
            exports : 'Foundation',
            deps : ['jquery']
        },
        jqueryui : {
            exports : 'jquery',
            deps : ['jquery']
        },
        select2 : {
            exports : 'jquery',
            deps : ['jquery']
        },
        widgetFactory : {
            exports : 'jquery',
            deps : ['jqueryui']
        },
        mouseInteraction : {
            exports : 'jquery',
            deps : ['jqueryui', 'widgetFactory']
        },
        sortable : {
            exports : 'jquery',
            deps : ['jqueryui', 'widgetFactory', 'mouseInteraction']
        },
        accordion : {
            exports : 'jquery',
            deps : ['jqueryui', 'widgetFactory']
        },
        ckeditorAdapter : {
            exports : 'jquery',
            deps : ['jquery', 'ckeditor']
        },
        scrollToFixed : {
            exports : 'jquery',
            deps : ['jquery']
        },
        datetimepicker : {
            exports : 'datetimepicker',
            deps : ['jquery']
        },
        velocity : {
            deps : ['jquery']
        },
        velocityUi : {
            deps : ['jquery', 'velocity']
        }
    },
    packages : [
        {
            name : 'underscore',
            location : 'vendor/lodash-amd/underscore'
        },
        {
            name : 'masseuse',
            location : 'vendor/masseuse/app'
        },
        {
            name : 'helpers',
            location : 'helpers'
        }
    ]
    // <%= paths %>
});

require([
    'backbone',
    'underscore',
    'jquery',
    'router',
    'constants',
    'ajaxCounterWorker',
    'require',
    'alerts',
    'dropdown',
    'tabs',
    'tooltip',
    'abide',
    'modernizr',
    'sortable',
    'accordion',
    'scrollToFixed',
    'select2',
    'sparkmd5',
    'contextjs',
    'velocity'
],
    /**
     * @param $
     * @param {Router} Router
     */
        function (Backbone, _, $, Router, constants, ajaxCounterWorker, require) {
        'use strict';

        require(['velocityUi'], function() {
            var router = new Router();

            _.templateSettings = {
                evaluate : /\[\[(.+?)\]\]/g,
                interpolate : /\[\[=(.+?)\]\]/g,
                escape : /\[\[-(.+?)\]\]/g
            };

            ajaxCounterWorker.setupCounter();

            // TODO: For some reason this is not needed?
            $(document).foundation();

            Backbone.history.start({
                hashChange : false,
                pushState: true,
                root: '/admin'
            });

            $(document).on('click', 'a:not([data-bypass])', function (evt) {
                var href = $(this).attr('href') || '';
                var protocol = this.protocol + '//';

                if (href && href!='#' && href.slice(protocol.length) !== protocol) {
                    evt.preventDefault();
                    router.navigate(href, {trigger:true});
                }
            });
        });
    });
