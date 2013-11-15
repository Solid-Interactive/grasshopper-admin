/*global define:false*/
define(['text!views/addUser/addUserView.html', 'addUserViewModel'], function (formTemplate, addUserViewModel) {
    'use strict';

    return {
        name : 'addUserView',
        ModelType : addUserViewModel,
        modelData: {},
        el : '#stage',
        templateHtml : formTemplate,
        events : {

        },
        appendView : true,
        bindings : [
            ['channels.views', 'rivetViewRendered', 'applyFoundationForms']
        ],
        rivetConfig : 'auto',
        mastheadButtons : []
    };
});