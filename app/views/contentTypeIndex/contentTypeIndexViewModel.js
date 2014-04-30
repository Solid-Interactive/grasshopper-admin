define(['grasshopperModel', 'resources', 'constants', 'grasshopperCollection', 'contentTypeDetailViewModel'],
    function (Model, resources, constants, GrasshopperCollection, contentTypeDetailViewModel) {

    'use strict';

    return Model.extend({
        defaults : {
            resources : resources
        },
        url : constants.api.contentTypes.url,
        initialize : initialize
    });

    function initialize() {
        this.set('contentTypes', new (GrasshopperCollection.extend({
            model : contentTypeDetailViewModel,
            url : function() {
                return constants.api.contentTypes.url;
            }
        }))());
    }

});