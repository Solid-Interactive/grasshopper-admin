define([
    'grasshopperModel', 'masseuse', 'resources', 'constants', 'underscore', 'api'
], function (Model, masseuse, resources, constants, _, api) {

    'use strict';
    var ComputedProperty = masseuse.ComputedProperty;
    return Model.extend({
        idAttribute : '_id',
        defaults : {
            username : false,
            role : false,
            enabled : false,
            email : false,
            profile : {},
            loggedIn : new ComputedProperty(['enabled'], function (enabled) {
                return enabled;
            }),
            href : new ComputedProperty(['_id'], function (id) {
                return constants.internalRoutes.user + '/' + id;
            }),
            hasGoogle : new ComputedProperty(['linkedIdentities'], function(identities){
                return _.contains(identities, 'google');
            }),
            hasBasic : new ComputedProperty(['linkedIdentities'], function(identities){
                return _.contains(identities, 'basic');
            })
        },
        unlinkGoogle : unlinkGoogle
    });

    function unlinkGoogle () {
        return api.unlinkGoogle(this.get('_id'));
    }

});
