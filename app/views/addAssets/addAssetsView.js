/*global define:false*/
define(['grasshopperBaseView', 'underscore', 'assetDetailView', 'assetDetailViewConfig', 'text!views/assetDetail/_assetDetailRow.html'],
    function (GrasshopperBaseView, _, AssetDetailView, assetDetailViewConfig, assetDetailRowTemplate) {
    'use strict';

    return GrasshopperBaseView.extend({
        afterRender : afterRender,
        navigateBack : navigateBack
    });

    function afterRender() {
        var self = this;

        this.displayModal(
                {
                    msg: 'Upload an Asset!',
                    type: 'upload',
                    data: {}
                })
            .done(function(data) {
                _.each(data.files, function(file) {
                   appendAssetDetailRow.call(self, file);
                });
                self.navigateBack();
            })
            .fail(function() {
                self.navigateBack();
            });
    }

    function navigateBack() {
        this.app.router.navigateNinja(this.app.router.breadcrumb[this.app.router.breadcrumb.length - 2]);
        this.app.router.breadcrumb.pop();
    }

    function appendAssetDetailRow(file) {
        var assetDetailView = new AssetDetailView(_.extend({}, assetDetailViewConfig,
            {
                name : 'assetDetailRow',
                modelData : {
                        nodeId : this.model.get('nodeId'),
                        fileName : file.name,
                        size : file.size,
                        lastmodified : file.lastModifiedDate,
                        fileData : file
                    },
                el : '#assetDetailRow',
                templateHtml : assetDetailRowTemplate,
                mastheadButtons : this.options.mastheadButtons
            }
        ));
        assetDetailView.start();
    }

});