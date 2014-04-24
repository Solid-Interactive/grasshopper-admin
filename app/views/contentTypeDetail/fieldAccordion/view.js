/*global define:false*/
define(['grasshopperBaseView', 'fieldAccordionConfig', 'underscore', 'resources', 'jquery'],
    function(grasshopperBaseView, fieldAccordionConfig, _, resources, $) {
        'use strict';

        return grasshopperBaseView.extend({
            defaultOptions : fieldAccordionConfig,
            afterRender : afterRender,
            changeFieldType : changeFieldType,
            addValidationRule : addValidationRule,
            removeValidationRule : removeValidationRule,
            removeThisField : removeThisField
        });

        function afterRender() {
            _handleValidation.call(this);
//            _initializeAccordions.call(this);
//            _handleNewFieldAccordion.call(this);
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
            } else {
                _actuallyChangeFieldPluginType.call(this, newType);
            }
        }

        function _handleValidation() {
            var validation = this.model.get('validation');

            if(validation) {
                this.model.get('validationCollection').reset(validation);
            }

            if(validation && validation.length > 0) {
                this.model.toggle('hasValidation');
            }
        }

        function _actuallyChangeFieldPluginType(newType) {
            var newModel = _.result(_.findWhere(this.model.get('plugins'), { type : newType }).config, 'modelData'),
                thisModel = this.model.pick('label', 'min', 'max', 'multi', 'helpText', 'validation', '_id'),
                index = this.parent.collection.indexOf(this.model),
                self = this;

            _.extend(newModel, thisModel);

            this.parent.collection.add(newModel, { at : index });

            setTimeout(function() { // This is here because the newly added field needs to be open.
                $('.fieldAccordion[modelid="'+ self.parent.collection.at(index).cid +'"]').click();
            }, 100);

            this.parent.collection.remove(this.model);
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

            this.model.set('selectedValidation', resources.contentType.selectOption, { silent : true });
        }

        function removeValidationRule(e, context) {
            e.stopPropagation();
            _warnUserBeforeDeleting.call(this)
                .done(_actuallyRemoveValidationRule.bind(this, context));
        }

        function _warnUserBeforeDeleting() {
            return this.displayModal({
                header : resources.warning,
                msg : resources.validationViews.deletionWarning
            });
        }

        function _actuallyRemoveValidationRule(context) {
            this.model.get('validationCollection').remove(context.validationmodel);
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

//        function _initializeAccordions() {
//            var $accordion = this.$el;
//
//            $accordion
//                .accordion(
//                {
//                    header : '.fieldAccordion',
//                    icons : false,
//                    active : false,
//                    collapsible : true,
//                    heightStyle : 'content',
//                    beforeActivate : function(event, ui) {
//                        console.log(ui);
//                        if($(ui.item).data('sorting')) {
//                            return false;
//                        }
//                    }
//                });
//        }
//
//        function _handleNewFieldAccordion() {
//            if(this.model.get('isNew')) {
//                this.$el.find('.fieldAccordion').click();
//            }
//        }

    });
