/*global define:false*/
define(['text!plugins/textbox/template.html', 'plugins/textbox/model', 'text!plugins/textbox/setupTemplate.html'],
    function (textBoxPluginTemplate, textBoxPluginModel, setupTemplate) {
        'use strict';

        return {
            name : 'textBoxPlugin',
            ModelType : textBoxPluginModel,
            modelData : {
                minimum : '1',
                maximum : '1',
                options : false,
                label : '',
                type : 'textbox',
                required : false,
                validation : false,
                value : ''
            },
            template : textBoxPluginTemplate,
            setupTemplate : setupTemplate,
            events : {},
            rivetConfig : 'auto',
            wrapper: false,
            listeners : [],
            mastheadButtons : []
        };
    });