/*global define:false*/
define(['baseView', 'rivetView', 'loginWorker'], function (BaseView, rivetView, loginWorker) {

        var LoginView = BaseView.extend({
            rivetView : rivetView({rivetScope : '#login', rivetPrefix : 'login'}),
            login : login
        });

        function login() {
            if (this.model.isValid()) {
                loginWorker.doLogin(this.model);
            }
        }

        return LoginView;
    });