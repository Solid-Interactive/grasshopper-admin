/*global define:false*/
define(['grasshopperBaseView', 'validationUrlConfig'],
    function (GrasshopperBaseView, validationUrlConfig) {
        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : validationUrlConfig,
            afterRender : afterRender
        });

        function afterRender() {
            _initializeSortableAccordions.call(this);
        }

        function _initializeSortableAccordions() {
            var $accordion = this.$el;

            $accordion
                .accordion(
                {
                    header : '.accordionHeader',
                    icons : false,
                    active : false,
                    collapsible : true,
                    heightStyle : 'content'
                }
            );
        }

    });


