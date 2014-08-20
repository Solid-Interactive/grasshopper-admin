/*global define*/
define([], function() {
    'use strict';

    var apiEndpoint = 'http://grasshopper-admin-sample.herokuapp.com',
        version = '0.29.5',
        libraryVersions = '[{"name":"ScrollToFixed","version":"1.0.6"},{"name":"SparkMD5","version":"0.0.5"},{"name":"ace","version":"1.1.3"},{"name":"ckeditor","version":"4.3.5"},{"name":"datetimepicker","version":"2.3.4"},{"name":"font-awesome","version":"4.1.0"},{"name":"foundation","version":"5.0.2"},{"name":"jquery.ui","version":"1.10.4"},{"name":"js-base64","version":"2.1.2"},{"name":"jsoneditor","version":"3.1.1"},{"name":"masseuse","version":"2.3.0"},{"name":"moment","version":"2.5.1"},{"name":"requirejs-text","version":"2.0.10"},{"name":"select2","version":"3.5.1"}]';

    return {
        version : version,
        libraryVersions: libraryVersions,
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
            usersQuery : {
                url : apiEndpoint + '/users/query'
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
            nodesChildrenDeep : {
                url : apiEndpoint + '/node/:id/children/deep'
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
            moveNode : {
                url : apiEndpoint + '/node/move'
            },
            contentQuery : {
                url : apiEndpoint + '/content/query'
            },
            version : {
                url : apiEndpoint + '/system'
            },
            google : {
                url : apiEndpoint + '/googleurl'
            },
            unlinkGoogle : {
                url : apiEndpoint + '/users/:id/unlink'
            }
        },
        internalRoutes : {
            user : '/user',
            users : '/users',
            addUser : '/add-user',
            sysInfo: '/sys-info',
            contentTypes : '/content-types',
            newContentType : '/content-types/new',
            contentTypeDetail : '/content-types/:id',
            content : '/items',
            contentDetail : '/item/:id',
            nodeDetail : '/items/nodeid/:id',
            login : '/login',
            logout : '/logout',
            about : '/about',
            createFolder : '/items/nodeid/:id/create-folder',
            addContent : '/items/nodeid/:id/create-content',
            createAssets : '/items/nodeid/:id/create-assets',
            forbidden : '/forbidden',
            notFound : '/not-found'
        },
        timeouts: {
            showSpinnerLoadingTimeout: 2000
        },
        fileExtensionsMap : {
            pdf : 'fa-file-pdf-o',
            doc : 'fa-file-word-o',
            docx : 'fa-file-word-o',
            xsl : 'fa-file-excel-o',
            xslx : 'fa-file-excel-o',
            txt : 'fa-file-text',
            zip : 'fa-file-archive-o',
            psd : 'fa-file-image-o',
            ai : 'fa-file-image-o',
            swf : 'fa-file-video-o'
        },
        imageExtensions : ['jpg', 'jpeg', 'png', 'bmp', 'webp', 'svg', 'gif'],
        contentSearchThrottle: 1000,
        pagination : {
            defaultLimit : 25,
            defaultSkip : 1,
            defaultPagesLimit : 7,
            defaultPageSize : [25, 50, 100, 'all'],
            defaultAllLimit : 100000
        },
        controlKeyCodeMap : {
            13 : 'enter',
            16 : 'shift',
            17 : 'cntrl',
            18 : 'alt',
            20 : 'capsLock',
            27 : 'esc',
            37 : 'lArr',
            38 : 'tArr',
            39 : 'rArr',
            40 : 'bArr',
            91 : 'leftCMD',
            93 : 'rightCMD'
        },
        // https://github.com/josdejong/jsoneditor/blob/master/docs/api.md

        jsoneditor : {
            mode: 'tree',
            modes:['code', 'tree']
        },

        loginRedirectKey : 'loginRedirect',

        profileGoogleLinkRedirect : {
            url : '/user/:id'
        }

    };

});