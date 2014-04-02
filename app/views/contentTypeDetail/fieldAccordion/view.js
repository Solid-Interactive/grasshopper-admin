/*global define:false*/
define(['grasshopperBaseView', 'fieldAccordionConfig', 'underscore', 'resources'],
    function(grasshopperBaseView, fieldAccordionConfig, _, resources) {
        'use strict';

        return grasshopperBaseView.extend({
            defaultOptions : fieldAccordionConfig,
            afterRender : afterRender,
            changeFieldType : changeFieldType,
            addValidationRule : addValidationRule,
            removeThisField : removeThisField
        });

        function afterRender() {
            if(this.model.get('validation')) {
                this.model.get('validationCollection').reset(this.model.get('validation'));
            }
            _initializeAccordions.call(this);
        }

        function changeFieldType(currentModel, newType) {
            var plugins = this.model.get('plugins'),
                previousType = this.model.previousAttributes().type,
                previousModelComplexity = _getModelDataTypeFromPlugins.call(this, plugins, previousType),
                currentModelComplexity = _getModelDataTypeFromPlugins.call(this, plugins, newType);

            if(currentModelComplexity !== previousModelComplexity) {
                _warnUserBeforeChangingComplexTypes.call(this)
                    .done(_actuallyChangeFieldPluginType.bind(this, newType))
                    .fail(_returnFieldPluginTypeToPreviousType.bind(this, previousType));
            }
        }

        function _actuallyChangeFieldPluginType(newType) {
            var newModel = _.findWhere(this.model.get('plugins'), { type : newType }).config.modelData,
                thisModel = this.model.pick('label', 'min', 'max', 'multi', 'helpText', 'required', 'validation', '_id');

            _.extend(newModel, thisModel);

            this.parent.collection.remove(this.model);
            this.parent.collection.add(newModel);
        }

        function _getModelDataTypeFromPlugins(plugins, type) {
            return _.findWhere(plugins, {
                type : type
            }).config.modelData.dataType;
        }

        function _warnUserBeforeChangingComplexTypes() {
            return this.displayModal(
                {
                    header : resources.warning,
                    msg : resources.contentType.switchingBetweenSimpleAndComplexTypesWarning
                });
        }

        function _returnFieldPluginTypeToPreviousType(previousType) {
            this.model.set('type', previousType, {silent: true});
        }

        function addValidationRule() {
            var selectedValidation = this.model.get('selectedValidation');

            this.model.get('validationCollection').add({
                type : selectedValidation
            });

            this.model.set('selectedValidation', null, { silent : true });
        }

        function removeThisField(e) {
            var self = this;

            e.stopPropagation();

            this.displayModal({
                header : resources.warning,
                msg : resources.contentType.removeFieldWarning
            })
                .done(function() {
                    self.parent.collection.remove(self.model);
                });

        }

        function _initializeAccordions() {
            var $accordion = this.$el;

            $accordion
                .accordion(
                {
                    header : '.accordionHeader',
                    icons : false,
                    active : false,
                    collapsible : true,
                    heightStyle : 'content'
                });
        }

    });