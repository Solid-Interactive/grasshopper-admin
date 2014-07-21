/*global define*/
define([], function() {
    'use strict';

    var apiEndpoint = '<%= apiEndpoint %>',
        version = '<%= version %>';

    return {
        version : version,
        api : {
            base : {
                url : apiEndpoint
            },
            login : {
                url : apiEndpoint + '/token'
            },
            logout : {
                url : apiEndpoint + '/token/logout'
            },
            user : {
                url : apiEndpoint + '/user'
            },
            users : {
                url : apiEndpoint + '/users'
            },
            newUser : {
                url : apiEndpoint + '/users'
            },
            contentTypes : {
                url : apiEndpoint + '/contenttypes'
            },
            node : {
                url : apiEndpoint + '/node'
            },
            nodesChildren : {
                url : apiEndpoint + '/node/:id/children'
            },
            nodesContent : {
                url : apiEndpoint + '/node/:id/content'
            },
            assets : {
                url : apiEndpoint + '/node/:id/assets'
            },
            nodesContentTypes : {
                url : apiEndpoint + '/node/:id/contenttype'
            },
            content : {
                url : apiEndpoint + '/content'
            },
            contentQuery : {
                url : apiEndpoint + '/content/query'
            },
            version : {
                url : apiEndpoint + '/system'
            }
        },
        contentSearchThrottle : 600,
        internalRoutes : {
            user : '#user',
            users : '#users',
            addUser : '#addUser',
            contentTypes : '#contentTypes',
            newContentType : '#contentTypes/new',
            contentTypeDetail : '#contentTypes/:id',
            content : '#items',
            contentDetail : '#item/:id',
            nodeDetail : '#items/nodeid/:id',
            login : '#login',
            logout : '#logout',
            about : '#about',
            createFolder : '#items/nodeid/:id/createFolder',
            addContent : '#items/nodeid/:id/createContent',
            createAssets : '#items/nodeid/:id/createAssets',
            forbidden : '#forbidden'
        }
    };

});