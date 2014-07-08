/*global define:false*/
define(['grasshopperBaseView', 'moment', 'jquery', 'datetimepicker'],
    function (GrasshopperBaseView, moment, $, datetimepicker) {
        'use strict';

        return GrasshopperBaseView.extend({
            beforeRender: beforeRender,
            afterRender: afterRender
        });

        function beforeRender () {
            Date.parseDate = function (input, format) {
                return moment(input, format).toDate();
            };

            Date.prototype.dateFormat = function (format) {
                return moment(this).format(format);
            };
        }

        function afterRender ($deferred) {
            setTimeout(_addDateTimePickers.bind(this, $deferred), 100);
        }

        function _addDateTimePickers ($deferred) {
            this.$el.find('.datetimepicker').each(function () {
                $(this).datetimepicker({
                    startDate : moment(),
                    timepicker : false,
                    format: 'YYYY/MM/DD',
                    formatDate: 'YYYY/MM/DD'
                });
            });
            $deferred.resolve();
        }

    });