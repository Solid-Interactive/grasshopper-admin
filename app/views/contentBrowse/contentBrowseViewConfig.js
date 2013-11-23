/*global define:false*/
define(['text!views/contentBrowse/contentBrowseView.html', 'resources', 'contentBrowseViewModel'], function (templateHtml, resources, contentBrowseViewModel) {
    'use strict';

    return {
        name : 'contentBrowseView',
        ModelType : contentBrowseViewModel,
        el : '#stage',
        templateHtml : templateHtml,
        rivetConfig : 'auto',
        bindings : [],
        appendView: true,
        events: {},
        mastheadButtons : [
            {
                text : resources.mastheadButtons.createContent,
                href : '#'
            },
            {
                text : resources.mastheadButtons.uploadFile,
                href : '#'
            },
            {
                text : resources.mastheadButtons.createFolder,
                href : '#'
            },
            {
                text : resources.mastheadButtons.actions,
                href : '#'
            }
        ],
        permissions: ['admin', 'reader', 'editor']
    };
});