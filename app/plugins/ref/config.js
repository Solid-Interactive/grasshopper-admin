/*global define:false*/
define(['text!plugins/ref/template.html', 'plugins/ref/model'],
    function (refTemplate, refPluginModel) {
        'use strict';

        return {
            name : 'ref',
            ModelType : refPluginModel,
            modelData : {},
            wrapper: false,
            template : refTemplate,
            events : {},
            rivetConfig : 'auto',
            bindings : [],
            mastheadButtons : []
        };
    });