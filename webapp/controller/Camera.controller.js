sap.ui.define([
	"./BaseController",
	'sap/m/Button',
	'sap/m/Dialog',
	'sap/m/MessageToast',
	'sap/m/Text',
	'sap/ui/core/Control',
	"sap/ui/model/json/JSONModel"
], function(BaseController, Button, Dialog, MessageToast, Text ) {
	"use strict";

	return BaseController.extend("YL_SCI_EXYardLogistics.controller.Camera", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf YL_SCI_EXYardLogistics.view.Camera
		 */
		onInit: function() {
					
		},

		onLogout: function() {
			var that = this;
			var dialog = new Dialog({
				title: 'Confirm Logout',
				type: 'Message',
				content: new Text({
					text: 'Wollen Sie sich wirklich abmelden?'
				}),
				beginButton: new Button({
					text: 'Logout',
					press: function() {
						MessageToast.show('Abmeldung läuft!');
						dialog.close();
						that.getRouter().getTargets().display("main");
					}
				}),
				endButton: new Button({
					text: 'Cancel',
					press: function() {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});

			dialog.open();
		},

		onBarrierMan: function() {

		},

		onShowData: function() {

		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf YL_SCI_EXYardLogistics.view.Camera
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf YL_SCI_EXYardLogistics.view.Camera
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf YL_SCI_EXYardLogistics.view.Camera
		 */
		//	onExit: function() {
		//
		//	}

	});

});