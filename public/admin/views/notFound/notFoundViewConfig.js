/*global define:false*/
define(['text!views/notFound/notFoundView.html', 'resources', 'constants'],
    function (template, resources, constants) {
        'use strict';

        return {
            name : 'notFoundView',
            modelData : {},
            browserTitle : 'Not Found',
            appendTo : '#stage',
            wrapper : false,
            template : template,
            events : {},
            listeners : [],
            breadcrumbs : [
                {
                    text : resources.home,
                    href : constants.internalRoutes.content
                },
                {
                    text : resources.notFound,
                    href : constants.internalRoutes.notFound
                }
            ]
        };
    });