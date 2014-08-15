/*global define:false*/
define(['text!views/sysInfo/sysInfoView.html', 'resources', 'constants'],
    function (template, resources, constants) {
        'use strict';

        return {
            name: 'sysInfoView',
            modelData: {},
            browserTitle: resources.sysInfo,
            appendTo: '#stage',
            wrapper: false,
            template: template,
            events: {},
            listeners: [],
            breadcrumbs: [
                {
                    text: resources.home,
                    href: constants.internalRoutes.content
                },
                {
                    text: resources.sysInfo,
                    href: constants.internalRoutes.sysInfo
                }
            ]/*,
            permissions: ['admin']*/
        };
    });