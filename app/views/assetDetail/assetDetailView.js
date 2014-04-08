/*global define:false*/
define(['grasshopperBaseView', 'assetDetailViewConfig', 'resources', 'api', 'assetWorker'],
    function (GrasshopperBaseView, assetDetailViewConfig, resources, Api, AssetWorker) {
        'use strict';
        return GrasshopperBaseView.extend({
            defaultOptions : assetDetailViewConfig,
            afterRender : afterRender,
            handleRowClick : handleRowClick,
            prepareToDeleteAsset : prepareToDeleteAsset,
            editAsset : editAsset,
            postNewAsset : postNewAsset,
            cancelUpload : cancelUpload
        });

        function afterRender() {
            if(this.model.has('fileData')) {
                this.postNewAsset();
            }
        }

        function handleRowClick(e) {
            e.stopPropagation();
            this.displayModal(
                {
                    header: this.model.get('fileName'),
                    type: 'image',
                    data: this.model.get('url')
                });
        }

        function prepareToDeleteAsset() {
            this.displayModal(
                {
                    msg: resources.asset.deletionWarning
                })
                .done(_deleteAsset.bind(this));
        }

        function editAsset() {
            var self = this;

            _getNewFileName.call(this)
                .done(function(modalData) {
                    _postRenamedAsset.call(self, modalData.data)
                        .done(_handleSuccessfulAssetRename.bind(self, modalData.data))
                        .fail(_handleAssetRenameError.bind(this));
                });
        }

        function postNewAsset() {
            this.model.set('uploadError', false);
            AssetWorker.postNewAsset(this.model.get('nodeId'), this.model.get('fileData'))
                .done(_handleSuccessfulUpload.bind(this))
                .fail(_handleFailedUpload.bind(this))
                .progress(_handleUploadProgress.bind(this));
        }

        function cancelUpload() {
            this.remove();
        }

        function _deleteAsset () {
            this.model.destroy()
                .done(_handleSuccessfulDelete.bind(this))
                .fail(_handleDeletionError.bind(this));
        }

        function _handleSuccessfulDelete () {
            this.displayTemporaryAlertBox(
                {
                    msg: resources.asset.successfullyDeletedPre + this.model.get('fileName') +
                        resources.asset.successfullyDeletedPost,
                    status: true
                }
            );
            this.remove();
        }

        function _handleDeletionError () {
            this.displayAlertBox(
                {
                    header : 'Error',
                    style : 'error',
                    msg: resources.asset.errorDeleted + this.model.get('fileName')
                }
            );
        }

        function _getNewFileName() {
            return this.displayModal(
                {
                    msg: resources.asset.editFileName,
                    type: 'input',
                    data: this.model.get('fileName')
                });
        }

        function _postRenamedAsset(newFileName) {
            return Api.renameAsset(this.model.urlRoot(), this.model.get('fileName'), newFileName);
        }

        function _handleSuccessfulAssetRename(newFileName) {
            var self = this;

            this.model.set('fileName', newFileName);
            this.model.fetch()
                .done(function() {
                    self.displayTemporaryAlertBox(
                        {
                            header : 'Success',
                            style : 'success',
                            msg: resources.asset.editNameSuccess
                        }
                    );
                });
        }

        function _handleAssetRenameError() {
            this.displayTemporaryAlertBox(
                {
                    header : 'Error',
                    style : 'error',
                    msg: resources.asset.editNameFail
                }
            );
        }

        function _handleUploadProgress(percentDone) {
            this.model.set('progressWidth', percentDone);
        }

        function _handleSuccessfulUpload(response) {
            var self = this;
            this.model.fetch()
                .done(function() {
                    self.model.unset('fileData');
                });
            this.displayTemporaryAlertBox(
                {
                    header : 'Success',
                    style : 'succes',
                    msg: response
                }
            );
        }

        function _handleFailedUpload() {
            this.model.set('uploadError', true);
            _handleUploadProgress.call(this, 0);
            this.displayTemporaryAlertBox(
                {
                    header : 'Error',
                    style : 'error',
                    msg: resources.asset.uploadAssetError
                }
            );
        }

    });