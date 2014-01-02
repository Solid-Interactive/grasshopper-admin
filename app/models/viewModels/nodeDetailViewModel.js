define(['grasshopperModel', 'resources', 'masseuse', 'constants'], function (Model, resources, masseuse, constants) {
    'use strict';
    var ComputedProperty = masseuse.ComputedProperty;
    return Model.extend({
        idAttribute : '_id',
        defaults : {
            resources : resources,
            href : new ComputedProperty(['_id'], function (id) {
                return constants.internalRoutes.nodeDetail.replace(':id', id);
            }),
            id : new ComputedProperty(['_id'], function (id) {
                return id;
            })
        },
        urlRoot : constants.api.node.url
    });
});