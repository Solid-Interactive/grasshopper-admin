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
        accordion : {
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
            deps : ['jquery']
        },
        widgetFactory : {
            deps : ['jqueryui']
        },
        mouseInteraction : {
            deps : ['jqueryui']
        },
        sortable : {
            deps : ['jqueryui', 'widgetFactory', 'mouseInteraction']
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
    ],
    paths : {
        // Libraries
        jquery : 'vendor/jquery/jquery',
        jqueryui : 'vendor/jquery.ui/ui/jquery.ui.core',
        backbone : 'vendor/backbone-amd/backbone',
        text : 'vendor/requirejs-text/text',
        rivets : 'vendor/rivets/dist/rivets',
        base64 : 'vendor/js-base64/base64',
        foundation : 'vendor/foundation/js/foundation/foundation',
        modernizr : 'vendor/modernizr/modernizr',

        // Routers
        router : 'router',

        // Foundation Dependencies
        alerts : 'vendor/foundation/js/foundation/foundation.alert',
        dropdown : 'vendor/foundation/js/foundation/foundation.dropdown',
        accordion : 'vendor/foundation/js/foundation/foundation.accordion',
        tabs : 'vendor/foundation/js/foundation/foundation.tab',
        tooltip : 'vendor/foundation/js/foundation/foundation.tooltip',
        abide : 'vendor/foundation/js/foundation/foundation.abide',

        // Jquery UI Dependencies
        widgetFactory : 'vendor/jquery.ui/ui/jquery.ui.widget',
        mouseInteraction : 'vendor/jquery.ui/ui/jquery.ui.mouse',
        sortable : 'vendor/jquery.ui/ui/jquery.ui.sortable',

        // Views
        grasshopperBaseView : 'views/grasshopperBaseView',

        addAssetsView : 'views/addAssets/addAssetsView',
        addAssetsViewConfig : 'views/addAssets/addAssetsViewConfig',
        addAssetsViewModel : 'views/addAssets/addAssetsViewModel',

        addContentView : 'views/addContent/addContentView',
        addContentViewConfig : 'views/addContent/addContentViewConfig',
        addContentViewModel : 'views/addContent/addContentViewModel',

        addFolderView : 'views/addFolder/addFolderView',
        addFolderViewConfig : 'views/addFolder/addFolderViewConfig',
        addFolderViewModel : 'views/addFolder/addFolderViewModel',

        addUserView : 'views/addUser/addUserView',
        addUserViewConfig : 'views/addUser/addUserViewConfig',
        addUserViewModel : 'views/addUser/addUserViewModel',

        alertBoxView : 'views/alertBox/alertBoxView',
        alertBoxViewConfig : 'views/alertBox/alertBoxViewConfig',
        alertBoxViewModel : 'views/alertBox/alertBoxViewModel',

        assetDetailView : 'views/assetDetail/assetDetailView',
        assetDetailViewConfig : 'views/assetDetail/assetDetailViewConfig',
        assetDetailViewModel : 'views/assetDetail/assetDetailViewModel',

        assetIndexView : 'views/assetIndex/assetIndexView',
        assetIndexViewConfig : 'views/assetIndex/assetIndexViewConfig',
        assetIndexViewModel : 'views/assetIndex/assetIndexViewModel',

        contentBrowseView : 'views/contentBrowse/contentBrowseView',
        contentBrowseViewConfig : 'views/contentBrowse/contentBrowseViewConfig',
        contentBrowseViewModel : 'views/contentBrowse/contentBrowseViewModel',

        contentDetailView : 'views/contentDetail/contentDetailView',
        contentDetailViewConfig : 'views/contentDetail/contentDetailViewConfig',
        contentDetailViewModel : 'views/contentDetail/contentDetailViewModel',

        contentIndexView : 'views/contentIndex/contentIndexView',
        contentIndexViewConfig : 'views/contentIndex/contentIndexViewConfig',
        contentIndexViewModel : 'views/contentIndex/contentIndexViewModel',

        contentTypeDetailView : 'views/contentTypeDetail/contentTypeDetailView',
        contentTypeDetailViewConfig : 'views/contentTypeDetail/contentTypeDetailViewConfig',
        contentTypeDetailViewModel : 'views/contentTypeDetail/contentTypeDetailViewModel',

        contentTypeIndexView : 'views/contentTypeIndex/contentTypeIndexView',
        contentTypeIndexViewConfig : 'views/contentTypeIndex/contentTypeIndexViewConfig',
        contentTypeIndexViewModel : 'views/contentTypeIndex/contentTypeIndexViewModel',

        dashboardView : 'views/dashboard/dashboardView',
        dashboardViewConfig : 'views/dashboard/dashboardViewConfig',
        dashboardViewModel : 'views/dashboard/dashboardViewModel',

        headerView : 'views/header/headerView',
        headerViewConfig : 'views/header/headerViewConfig',
        headerViewModel : 'views/header/headerViewModel',

        loginView : 'views/login/loginView',
        loginViewConfig : 'views/login/loginViewConfig',
        loginViewModel : 'views/login/loginViewModel',

        mastheadView : 'views/masthead/mastheadView',
        mastheadViewConfig : 'views/masthead/mastheadViewConfig',
        mastheadViewModel : 'views/masthead/mastheadViewModel',

        modalView : 'views/modal/modalView',
        modalViewConfig : 'views/modal/modalViewConfig',
        modalViewModel : 'views/modal/modalViewModel',

        nodeDetailView : 'views/nodeDetail/nodeDetailView',
        nodeDetailViewConfig : 'views/nodeDetail/nodeDetailViewConfig',
        nodeDetailViewModel : 'views/nodeDetail/nodeDetailViewModel',

        nodeIndexView : 'views/nodeIndex/nodeIndexView',
        nodeIndexViewConfig : 'views/nodeIndex/nodeIndexViewConfig',
        nodeIndexViewModel : 'views/nodeIndex/nodeIndexViewModel',

        pluginWrapperView : 'views/pluginWrapper/pluginWrapperView',
        pluginWrapperViewConfig : 'views/pluginWrapper/pluginWrapperViewConfig',
        pluginWrapperViewModel : 'views/pluginWrapper/pluginWrapperViewModel',

        userDetailView : 'views/userDetail/userDetailView',
        userDetailViewConfig : 'views/userDetail/userDetailViewConfig',
        userDetailViewModel : 'views/userDetail/userDetailViewModel',

        usersIndexView : 'views/usersIndex/usersIndexView',
        usersIndexViewConfig : 'views/usersIndex/usersIndexViewConfig',
        usersIndexViewModel : 'views/usersIndex/usersIndexViewModel',

        // Models
        selfValidatingModel : 'models/selfValidatingModel',
        UserModel : 'models/userModel',
        grasshopperModel : 'models/grasshopperModel',
        pluginSetupModel : 'models/pluginSetupModel',

        // Workers
        loginWorker : 'workers/loginWorker',
        contentTypeWorker : 'workers/contentTypeWorker',
        assetWorker : 'workers/assetWorker',
        breadcrumbWorker : 'workers/breadcrumbWorker',
        nodeWorker : 'workers/nodeWorker',

        // Collections
        grasshopperCollection : 'collections/grasshopperCollection',
        userCollection : 'collections/userCollection',

        // Api proxy
        api : 'api/api',

        // Validation
        validation : 'validation/validation',

        // Plugins
        plugins : 'plugins',

        // Binders
        appBinders : 'appBinders',
        pluginWrapperBinders : 'views/pluginWrapper/pluginWrapperBinders',
        contentTypeDetailBinders : 'views/contentTypeDetail/contentTypeDetailBinders',
        usersIndexViewBinders : 'views/usersIndex/binders',

        // Formatters
        formatters : 'formatters',
        contentTypeDetailFormatters : 'views/contentTypeDetail/contentTypeDetailFormatters',

        // Resources Files
        resources : 'resources',
        constants : 'constants'
    }
});

require([
    'backbone',
    'underscore',
    'jquery',
    'router',
    'constants',
    'alerts',
    'dropdown',
    'accordion',
    'tabs',
    'tooltip',
    'abide',
    'modernizr',
    'sortable'
],
    /**
     * @param $
     * @param {Router} Router
     */
        function (Backbone, _, $, Router, constants) {

        'use strict';

        _.templateSettings = {
            evaluate : /\[\[(.+?)\]\]/g,
            interpolate : /\[\[=(.+?)\]\]/g,
            escape : /\[\[-(.+?)\]\]/g
        };

        // TODO: For some reason this is not needed?
        $(document).foundation();

        // TODO : This should come from a build task run in Grunt
        $('head').append('<link rel="stylesheet" type="text/css" href="themes/' +
            constants.defaults.theme + '/main.css" />');

        var router = new Router();
        Backbone.history.start();
        router.breadcrumb = [];
        Backbone.history.on('route', function () {
            router.breadcrumb.push(this.fragment);
        }, this);
        // TODO: setup push state on nginx
        //Backbone.history.start({pushState: true});
    });