define(['api', 'jquery', 'emptyView', 'emptyViewConfig', 'resources', 'UserModel'],
    function (api, $, EmptyView, emptyViewConfig, resources,  UserModel) {
        'use strict';

        return {
            doLogin : doLogin,
            doLogout : doLogout
        };

        function doLogin (loginView) {
            api.getToken(loginView.model.get('username'), loginView.model.get('password'))
                .done(function (data) {
                    if ("Token" === data.token_type) {
                        localStorage.authToken = data.access_token;
                        loginView.app.user.set('loggedIn', true);
                        loginView.app.router.navigate('', {trigger: true});
                    }
                })
                .fail(function (xhr) {
                    loginView.throwLoginError(resources.api.login.errors[xhr.status]);
                });
        }

        function doLogout (thisUser) {
            localStorage.authToken = '';
            thisUser.app.router.navigate('login', {trigger: true});
            // TODO: this should be a property set not a trigger
            thisUser.app.user.set('loggedIn', false);
            thisUser.app.user = new UserModel();

        }
    });