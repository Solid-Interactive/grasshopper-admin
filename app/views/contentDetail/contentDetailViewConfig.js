/*global define:false*/
define(['text!views/contentDetail/contentDetailView.html', 'text!views/contentDetail/_contentDetailRow.html',
    'contentDetailViewModel', 'appBinders'],
    function (formTemplate, rowTemplate, contentDetailViewModel, appBinders) {
        'use strict';

        return {
            name : 'contentDetailView',
            ModelType : contentDetailViewModel,
            modelData : {},
            appendTo : '#stage',
            wrapper : false,
            template : formTemplate,
            events : {
                'click #deleteContent' : 'deleteContent',
                'click .clickableCell' : 'handleRowClick',
                'click #saveContentButton' : 'saveContent'
            },
            listeners : [],
            rivetConfig : 'auto',
            mastheadButtons : [],
            permissions : ['admin', 'reader', 'editor'],
            rivetsBinders : [appBinders]
        };
    });