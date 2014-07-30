/*global define*/
define(["plugins/boolean/config.js","plugins/boolean/view.js","plugins/checkbox/config.js","plugins/checkbox/view.js","plugins/codeeditor/config.js","plugins/codeeditor/view.js","plugins/contentreference/config.js","plugins/contentreference/view.js","plugins/date/config.js","plugins/date/view.js","plugins/datetime/config.js","plugins/datetime/view.js","plugins/dropdown/config.js","plugins/dropdown/view.js","plugins/editorialwindow/config.js","plugins/editorialwindow/view.js","plugins/embeddedtype/config.js","plugins/embeddedtype/view.js","plugins/filereference/config.js","plugins/filereference/view.js","plugins/keyvalue/config.js","plugins/keyvalue/view.js","plugins/number/config.js","plugins/number/view.js","plugins/password/config.js","plugins/password/view.js","plugins/radio/config.js","plugins/radio/view.js","plugins/readonly/config.js","plugins/readonly/view.js","plugins/richtext/config.js","plugins/richtext/view.js","plugins/slug/config.js","plugins/slug/view.js","plugins/svgeditor/config.js","plugins/svgeditor/view.js","plugins/textarea/config.js","plugins/textarea/view.js","plugins/textbox/config.js","plugins/textbox/view.js"],
    function(booleanConfig,booleanView,checkboxConfig,checkboxView,codeeditorConfig,codeeditorView,contentreferenceConfig,contentreferenceView,dateConfig,dateView,datetimeConfig,datetimeView,dropdownConfig,dropdownView,editorialwindowConfig,editorialwindowView,embeddedtypeConfig,embeddedtypeView,filereferenceConfig,filereferenceView,keyvalueConfig,keyvalueView,numberConfig,numberView,passwordConfig,passwordView,radioConfig,radioView,readonlyConfig,readonlyView,richtextConfig,richtextView,slugConfig,slugView,svgeditorConfig,svgeditorView,textareaConfig,textareaView,textboxConfig,textboxView) {
        return {
            fields : [
				{
					type: "boolean", 
					id: 1, 
					config: booleanConfig, 
					helpText: "boolean Help Text", 
					name: "Boolean", 
					view: booleanView
				},
				{
					type: "checkbox", 
					id: 2, 
					config: checkboxConfig, 
					helpText: "Checkbox Help Text", 
					name: "Checkbox", 
					view: checkboxView
				},
				{
					type: "codeeditor", 
					id: 3, 
					config: codeeditorConfig, 
					helpText: "Code Editor Help Text", 
					name: "Code Editor", 
					view: codeeditorView
				},
				{
					type: "contentreference", 
					id: 4, 
					config: contentreferenceConfig, 
					helpText: "Content Reference Help Text", 
					name: "Content Reference", 
					view: contentreferenceView
				},
				{
					type: "date", 
					id: 5, 
					config: dateConfig, 
					helpText: "Date Help Text", 
					name: "Date", 
					view: dateView
				},
				{
					type: "datetime", 
					id: 6, 
					config: datetimeConfig, 
					helpText: "DateTime Help Text", 
					name: "Date Time", 
					view: datetimeView
				},
				{
					type: "dropdown", 
					id: 7, 
					config: dropdownConfig, 
					helpText: "Dropdown Help Text", 
					name: "Dropdown", 
					view: dropdownView
				},
				{
					type: "editorialwindow", 
					id: 8, 
					config: editorialwindowConfig, 
					helpText: "Editorial Window Help Text", 
					name: "Editorial Window", 
					view: editorialwindowView
				},
				{
					type: "embeddedtype", 
					id: 9, 
					config: embeddedtypeConfig, 
					helpText: "embedded type Help Text", 
					name: "Embedded Type", 
					view: embeddedtypeView
				},
				{
					type: "filereference", 
					id: 10, 
					config: filereferenceConfig, 
					helpText: "File Reference Help Text", 
					name: "File Reference", 
					view: filereferenceView
				},
				{
					type: "keyvalue", 
					id: 11, 
					config: keyvalueConfig, 
					helpText: "keyvalue Help Text", 
					name: "Key : Value", 
					view: keyvalueView
				},
				{
					type: "number", 
					id: 12, 
					config: numberConfig, 
					helpText: "number Help Text", 
					name: "Number", 
					view: numberView
				},
				{
					type: "password", 
					id: 13, 
					config: passwordConfig, 
					helpText: "password Help Text", 
					name: "Password", 
					view: passwordView
				},
				{
					type: "radio", 
					id: 14, 
					config: radioConfig, 
					helpText: "radio Help Text", 
					name: "Radio", 
					view: radioView
				},
				{
					type: "readonly", 
					id: 15, 
					config: readonlyConfig, 
					helpText: "Readonly Help Text", 
					name: "Readonly", 
					view: readonlyView
				},
				{
					type: "richtext", 
					id: 16, 
					config: richtextConfig, 
					helpText: "Rich Text Help Text", 
					name: "Rich Text", 
					view: richtextView
				},
				{
					type: "slug", 
					id: 17, 
					config: slugConfig, 
					helpText: "Slug Help Text", 
					name: "Slug", 
					view: slugView
				},
				{
					type: "svgeditor", 
					id: 18, 
					config: svgeditorConfig, 
					helpText: "Svg Editor Help Text", 
					name: "Svg Editor", 
					view: svgeditorView
				},
				{
					type: "textarea", 
					id: 19, 
					config: textareaConfig, 
					helpText: "TextArea Help Text", 
					name: "TextArea", 
					view: textareaView
				},
				{
					type: "textbox", 
					id: 20, 
					config: textboxConfig, 
					helpText: "TextBox Help Text", 
					name: "TextBox", 
					view: textboxView
				}
            ]
        };
    });
