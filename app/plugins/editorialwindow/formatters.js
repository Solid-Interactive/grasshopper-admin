define(['moment'], function (moment) {
    'use strict';

    return {
        asEditorialDate : {
            read : readAsEditorialDate,
            publish : publishAsEditorialDate
        }
    };

    function readAsEditorialDate(value) {
        if(value) {
            return moment(value).format('YYYY-MM-DD h:mm a');
        }
    }

    function publishAsEditorialDate(value) {
        if(value) {
            return moment(value).toISOString();
        }
    }

});