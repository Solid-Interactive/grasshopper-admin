/*global define:false*/
define(['text!views/modal/modalView.html', 'modalViewModel'], function (template, modalViewModel) {
    'use strict';

    return {
        name : 'modalView',
        ModelType : modalViewModel,
        el : '#modal',
        template : template,
        rivetConfig : 'auto',
        appendView : true,
        events : {
            'click #confirm' : 'confirmModal',
            'click #cancel' : 'cancelModal',
            'click #dropZone' : 'fireClickOnUploadFileInput',
            'change #uploadFileInput' : 'handleFileSelect',
            'dragover #dropZone' : 'handleDragOver',
            'drop #dropZone' : 'handleFileDrop',
            'dragleave #dropZone' : 'handleDragLeave'
        }
    };
});