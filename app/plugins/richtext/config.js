/*global define:false*/
define(['text!plugins/richtext/template.html', 'plugins/richtext/model', 'text!plugins/richtext/setupTemplate.html'],
    function (richTextPluginTemplate, richTextPluginModel, setupTemplate) {
        'use strict';

        return {
            name : 'richTextPlugin',
            ModelType : richTextPluginModel,
            modelData : {
                min : 1,
                max : 1,
                options : false,
                label : '',
                type : 'richtext',
                dataType : 'string',
                required : false,
                validation : false,
                value : ''
            },
            template : richTextPluginTemplate,
            setupTemplate : setupTemplate,
            events : {},
            wrapper: false,
            listeners : [],
            mastheadButtons : []
        };
    });