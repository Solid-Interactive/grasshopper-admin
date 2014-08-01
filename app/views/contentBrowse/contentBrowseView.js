/*global define:false*/
define(['grasshopperBaseView', 'contentBrowseViewConfig', 'jquery', 'paginationWorker',
    'underscore', 'breadcrumbWorker', 'constants', 'nodeWorker', 'addFolderViewConfig'],
    function (GrasshopperBaseView, contentBrowseViewConfig, $, paginationWorker,
              _, breadcrumbWorker, constants, nodeWorker, addFolderViewConfig) {
        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : contentBrowseViewConfig,
            beforeRender : beforeRender,
            afterRender : afterRender,
            activateTab : activateTab,
            createContent : createContent,
            createAssets : createAssets,
            createFolder : createFolder,
            addNewNode : addNewNode,
            addNewAsset : addNewAsset,
            editNodeName : editNodeName,
            editNodeContentTypes : editNodeContentTypes,
            deleteNode : deleteNode,
            searchContent : searchContent,
            hasCreateFolderPermission: hasCreateFolderPermission
        });

        function beforeRender ($deferred) {
            $.when(
                _buildMastheadBreadcrumb.call(this),
                this.model.fetch(),
                this.model.get('childNodes').fetch(),
                _getChildContent.call(this))
                .done($deferred.resolve, _addAssetIndexView.bind(this))
                .fail($deferred.reject);
        }

        function afterRender () {
            this.$el.foundation();
        }

        function _addAssetIndexView() {
            if (!this.model.get('inRoot')) {
                this.model.get('childAssets').fetch();
            }
        }

        function _buildMastheadBreadcrumb () {
            var $deferred = new $.Deferred();

            breadcrumbWorker.contentBrowse.call(this, $deferred);

            return $deferred.promise();
        }

        function _getChildContent() {
            if(!this.model.get('inRoot')) {
                return this.searchContent();
            }
        }

        function activateTab (tab) {
            $('#' + tab + ' a').click();
        }

        function createContent() {
            this.app.router.navigateTrigger(
                constants.internalRoutes.addContent.replace(':id', this.model.get('nodeId')));
        }

        function createAssets() {
            this.app.router.navigateTrigger(
                constants.internalRoutes.createAssets.replace(':id', this.model.get('nodeId')));
        }

        function createFolder() {
            this.app.router.navigateTrigger(
                constants.internalRoutes.createFolder.replace(':id', this.model.get('nodeId')));
        }

        function addNewNode(nodeName) {
            this.model.get('childNodes').add({
                label : nodeName,
                parent : this.model.get('nodeId')
            });
        }

        function addNewAsset(newAssetPayload) {
            this.model.get('childAssets').add(newAssetPayload);
        }

        function editNodeName() {
            nodeWorker.editName.call(this)
                .done(breadcrumbWorker.resetBreadcrumb.bind(this), _buildMastheadBreadcrumb.bind(this));
            _closeActionsDropdown.call();
        }

        function editNodeContentTypes() {
            nodeWorker.editContentTypes.call(this);
            _closeActionsDropdown.call();
        }

        function deleteNode() {
            nodeWorker.deleteNode.call(this);
            _closeActionsDropdown.call();
        }

        function searchContent() {
            var childContent = this.model.get('childContent'),
                contentSearchValue = this.model.get('contentSearchValue');

            _toggleSearchSpinner.call(this);
            childContent.searchQuery(contentSearchValue)
                .done(
                    paginationWorker.setUrl.bind(this, childContent.limit, constants.pagination.defaultSkip, contentSearchValue),
                    _toggleSearchSpinner.bind(this, true)
                );
        }

        function _toggleSearchSpinner(revert) {
            var $searchIcon = this.$('.contentSearchIcon');

            if (revert) {
                $searchIcon.removeClass('fa-refresh fa-spin');
                $searchIcon.addClass('fa-search');
            } else {
                $searchIcon.removeClass('fa-search');
                $searchIcon.addClass('fa-refresh fa-spin');
            }
        }

        function _closeActionsDropdown() {
            $('#actionsDropdown').click();
        }

        function hasCreateFolderPermission(){
            var role = this.app.user ? this.app.user.get('role') : undefined;

            return _.contains(addFolderViewConfig.permissions, role);
        }

    });