/*global define*/
define([
    'backbone',
    'loginView',
    'loginViewConfig',
    'api',
    'loginWorker',
    'userWorker',
    'emptyView',
    'emptyViewConfig',
    'underscore',
    'baseView',
    'UserModel',
    'alertBoxView',
    'alertBoxViewConfig',
    'resources',
    'userDetailView',
    'userDetailViewConfig',
    'headerView',
    'headerViewConfig',
    'usersIndexView',
    'usersIndexViewConfig'
],
    function (Backbone, LoginView, loginViewConfig, Api, loginWorker, userWorker, EmptyView, emptyViewConfig, _, BaseView, UserModel, AlertBoxView, alertBoxViewConfig, resources, UserDetailView, userDetailViewConfig, HeaderView, headerViewConfig, UsersIndexView, usersIndexViewConfig) {

        var userModel = new UserModel(),
            currentView;

        /**
         * @class Router
         * @extends Backbone.Router
         */
        var Router = Backbone.Router.extend({
            initialize : initialize,
            start : start,

            routes : {
                'login' : 'displayLogin',
                'logout' : 'goLogout',
                'user/:id' : 'displayUserDetail',
                'home' : 'displayApp',
                'users(/page:number)' : 'displayUsersIndex'
            },

            navigateTrigger : navigateTrigger,
            navigateNinja : navigateNinja,
            navigateDeferred : navigateDeferred,

            displayApp : displayApp,
            displayLogin : displayLogin,
            goLogout : goLogout,
            displayUserDetail : displayUserDetail,
            user : userModel,
            navigate : navigate,
            displayUsersIndex : displayUsersIndex
        });

        function navigateTrigger (fragment, options) {
            options = options || {};
            options.trigger = true;
            this.navigate(fragment, options);
        }

        function navigateNinja (fragment, options) {
            options = options || {};
            options.replace = true;
            this.navigate(fragment, options);
        }

        function navigateDeferred (fragment, options) {
            options = options || {};
            options.deferred = true;
            this.navigate(fragment, options);
        }

        function navigate (fragment, options) {

            if (currentView && currentView.destroy) {
                currentView.destroy();
            }
            Backbone.Router.prototype.navigate.apply(this, arguments);

        }

        function initialize () {
            // TODO: remove after getting userDetailViewModel sorted out
            window.router = this;
            var oldSet = Backbone.Collection.prototype.set;

            BaseView.prototype.app = {
                router : this,
                user : this.user
            };
            BaseView.prototype.displayAlertBox = function displayAlertBox (msg) {
                var alertBoxView = new AlertBoxView(alertBoxViewConfig);
                alertBoxView.model.set('error', msg);
                alertBoxView.start();
                alertBoxView.rivetView();
            };

            Backbone.Collection.prototype.set = function (data, options) {
                if (data && data.results) {
                    data = data.results;
                }
                oldSet.call(this, data, options);
            };

        }

        function start () {
            var headerView,
                self = this;

            Api.authenticateToken(localStorage.authToken)
                .done(function () {
                    self.navigate('home', {trigger : true});
                })
                .fail(function () {
                    self.navigate('login', {trigger : true});
                });

            headerView = newView(HeaderView, headerViewConfig);
            headerView.start();
            headerView.rivetView();

            return this;
        }

        function goLogout () {
            localStorage.authToken = '';
            this.user.clear();
            this.navigate('login', {trigger : true});
        }

        function displayLogin () {
            var loginView = newView(LoginView, loginViewConfig);
            loginView.start();
            loginView.rivetView();
        }

        function displayApp () {
            // Get the current Logged In users Details.
            userWorker.getCurrentUserDetails(userModel);
            // Display the app.
            var emptyView = newView(EmptyView, emptyViewConfig);
            emptyView.start();
            emptyView.rivetView();
        }

        function displayUserDetail (id) {
            userWorker.getProfileData(userModel, id)
                .done(function (data) {
                    var userDetailView = newView(UserDetailView, userDetailViewConfig);
                    userDetailView.start();
                    userDetailView.rivetView();
                    userDetailView.model.set(data);
//                    userDetailView.model.set(data, {silent: true});

                })
                .fail(function (xhr) {
                    BaseView.prototype.displayAlertBox(resources.user.errors[xhr.status]);
                });
        }

        function displayUsersIndex (pageNumber) {
            var usersIndexView = newView(UsersIndexView, usersIndexViewConfig);
            usersIndexView.start();
            usersIndexView.rivetView();

            if (pageNumber) {
                usersIndexView.goToPage(pageNumber);
            } else {
                usersIndexView.goToPage(1);
            }
        }

        function newView (ViewType, config, bypass) {
            if (currentView) {
                if (currentView.options.name !== config.name || bypass) {
                    currentView = new ViewType(config);
                }
            } else {
                currentView = new ViewType(config);
            }

            return currentView;
        }

        return Router;
    });