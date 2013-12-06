/*global define:false*/
define(['grasshopperBaseView', 'resources'], function (GrasshopperBaseView, resources) {

    return GrasshopperBaseView.extend({
        deleteContent : deleteContent,
        handleRowClick : handleRowClick
    });

    function deleteContent() {
        var self = this;

        this.displayModal(
                {
                    msg: resources.contentItem.deletionWarning
                })
            .done(function() {
                self.model.destroy(
                    {
                        success: function(model) {
                            self.displayTemporaryAlertBox(resources.contentItem.successfullyDeletedPre + model.get('label') + resources.contentItem.successfullyDeletedPost, true);
                            self.remove();
                        },
                        error: function(model) {
                            self.displayAlertBox(resources.contentItem.errorDeleted + model.get('label'));
                        }
                    });
            });
    }

    function handleRowClick() {
        this.app.router.navigateTrigger(this.model.get('href'));
    }
});