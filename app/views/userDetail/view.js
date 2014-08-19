/*global define:false*/
define(['grasshopperBaseView', 'userDetail/options', 'resources', 'constants', 'breadcrumbWorker', 'underscore',
    'mixins/handleRowCLick', 'mixins/jsonEditor', 'helpers', 'api'],
    function (GrasshopperBaseView, options, resources, constants, breadcrumbWorker, _,
              handleRowCLick, jsonEditor, helpers, Api) {

        'use strict';
        var LocalStorage = helpers.localStorage;

        return GrasshopperBaseView.extend({
            defaultOptions: options,
            beforeRender: beforeRender,
            afterRender: afterRender,
            saveUser: saveUser,
            saveAndClose: saveAndClose,
            toggleEnabled: toggleEnabled,
            deleteUser: deleteUser,
            addNewUser: addNewUser,
            toggleGoogle: toggleGoogle
        })
            .extend(handleRowCLick);

        function beforeRender ($deferred) {
            this.model.fetch()
                .done(_updateMastheadBreadcrumbs.bind(this, $deferred));
        }

        function afterRender () {
            _setUpEnabledChangeWarning.call(this);
            _setUpJsonEditor.call(this);
        }

        function _setUpJsonEditor () {
            var initialValue = this.model.get('profile');

            jsonEditor.init(document.getElementById('profile'), this, {
                change: _jsonEditorChangeCallback.bind(this),
                json: initialValue
            });
        }

        function _jsonEditorChangeCallback () {
            this.model.set('profile', this.jsonEditor.get());
        }

        function saveUser () {
            this.model.toggle('saving');
            _updateUserWorkflow.call(this, {});
        }

        function saveAndClose () {
            this.model.toggle('saving');
            _updateUserWorkflow.call(this, { close: true });
        }

        function _updateUserWorkflow (options) {
            this.model.save()
                .done(_handleSuccessfulSave.bind(this, options))
                .fail(_handleFailedSave.bind(this));
        }

        function _showSelfLockoutWarning () {
            return this.displayModal(
                {
                    header: resources.warning,
                    msg: resources.user.selfLockWarning
                });
        }

        function deleteUser () {
            _deleteUserWorkflow.call(this);
        }

        function _deleteUserWorkflow() {
            _warnUserBeforeDeleting.call(this)
                .done(_actuallyDeleteUser.bind(this));
        }

        function _warnUserBeforeDeleting() {
            return this.displayModal(
                {
                    header: resources.warning,
                    msg: resources.user.delete.warningMessage
                });
        }

        function _actuallyDeleteUser() {
            this.model.destroy()
                .then(_handleSuccessfulUserDeletion.bind(this))
                .fail(_handleFailedUserDeletion.bind(this));
        }

        function _handleSuccessfulUserDeletion() {
            this.app.router.navigateTrigger(constants.internalRoutes.users);

            this.displayTemporaryAlertBox(
                {
                    header: resources.success,
                    style: 'success',
                    msg: resources.user.delete.success
                }
            );
        }

        function _handleFailedUserDeletion() {
            this.displayTemporaryAlertBox(
                {
                    header: resources.error,
                    style: 'error',
                    msg: resources.user.delete.failure
                }
            );
        }

        function toggleEnabled (e) {
            e.stopPropagation();
            this.model.toggle('enabled');
            this.model.trigger('change:enabled');
            this.saveUser();
        }

        function _setUpEnabledChangeWarning () {
            var self = this;

            this.model.on('change:enabled', function () {
                if (self.model.get('userIsChangingTheirProfile') && self.model.get('enabled').toString() === 'false') {
                    _showSelfLockoutWarning.call(self)
                        .fail(function () {
                            self.model.set('enabled', self.model.previous('enabled'));
                        });
                }
            });
        }

        function _handleSuccessfulSave (options, model) {
            this.displayTemporaryAlertBox(
                {
                    header: resources.success,
                    style: 'success',
                    msg: resources.user.successfullyUpdated
                }
            );

            if (options.close) {
                this.app.router.navigateTrigger(constants.internalRoutes.users);
            } else {
                this.model.toggle('saving');
            }

            _updateNameInHeader.call(this, model);
        }

        function _handleFailedSave (xhr) {
            this.model.toggle('saving');

            this.fireErrorModal(xhr.responseJSON.message);
        }

        function _updateNameInHeader (model) {
            if (this.app.user.get('_id') === model._id) {
                this.app.user.set(model);
            }
        }

        function _updateMastheadBreadcrumbs ($deferred) {
            breadcrumbWorker.userBreadcrumb.call(this, $deferred);
        }

        function addNewUser () {
            this.app.router.navigateTrigger(constants.internalRoutes.addUser);
        }

        function toggleGoogle (e) {
            if (this.model.get('hasGoogle')) {
                _unlinkGoogle.call(this);
            } else {
                _linkGoogle.call(this);
            }
            e.preventDefault();
        }

        function _unlinkGoogle () {
            if (this.model.get('hasBasic')) {
                _unlinkWithBasicRemaining.call(this);
            } else {
                _unlinkWithoutBasicRemaining.call(this);
            }
        }

        function _unlinkWithBasicRemaining () {
            this.displayModal(resources.user.unlinkModalWithBasic)
                .done(_unlinkFromModel.bind(this));
        }

        function _unlinkWithoutBasicRemaining () {
            this.displayModal(resources.user.unlinkModalWithoutBasic)
                .done(_unlinkFromModel.bind(this));
        }

        function _unlinkFromModel () {
            this.model.get('userModel').unlinkGoogle()
                .done(_refreshModelAndDisplaySuccess.bind(this));
        }

        function _refreshModelAndDisplaySuccess () {
            this.model.fetch()
                .done(_displayUnlinkSuccessModal.bind(this))
                .fail(_unlinkFail.bind(this));
        }

        function _displayUnlinkSuccessModal () {
            this.displayModal(resources.user.unlinkSuccessModal);
        }

        function _unlinkFail () {
            this.app.router.goLogout();
        }

        function _linkGoogle () {
            this.displayModal(resources.user.linkModal)
                .done(linkToModel.bind(this));
        }

        function linkToModel () {
            LocalStorage.set(constants.loginRedirectKey, constants.profileGoogleLinkRedirect.url.replace(':id', this.model.get('_id')));
            _loginWithGoogle.call(this);
        }

        function _loginWithGoogle() {
            Api.getGoogleUrl()
                .done(function(url) {
                    window.location.href = url;
                })
                .fail(_throwLoginError.bind(this));
        }

        function _throwLoginError (xhr) {
            this.fireErrorModal(xhr);
        }

    });


/*
 {
 "__v" : 1,
 "_id" : ObjectId("53f25d4ac0578800007ccf5b"),
 "createdby" : {
 "id" : "5246e73d56c02c0744000004",
 "displayname" : "admin"
 },
 "dateCreated" : ISODate("2014-08-18T20:08:42.895Z"),
 "displayname" : "greg.larrenaga@thinksolid.com",
 "email" : "greg.larrenaga@thinksolid.com",
 "enabled" : true,
 "firstname" : "Greg",
 "identities" : {
 "google" : {
 "accessToken" : "ya29.ZQBEtbhB2Q8tUiIAAAD2b3BHqzzXCbL7NnGlEXCGgoSpLiPmMVtx2UzJQ9r1sVc8OE5gC-1JAslcjXnW3L0",
 "id" : "105708433433841019982"
 }
 },
 "lastname" : "Larrenaga",
 "linkedidentities" : [],
 "permissions" : [],
 "profile" : {
 "picture" : "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg"
 },
 "role" : "admin",
 "updatedby" : {
 "id" : "5246e73d56c02c0744000004",
 "displayname" : "admin"
 }
 }
 */