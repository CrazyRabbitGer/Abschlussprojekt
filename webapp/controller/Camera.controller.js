sap.ui.define([
	"./BaseController",
	'sap/m/Button',
	'sap/m/Dialog',
	'sap/m/MessageToast',
	'sap/m/Text',
	"sap/ui/model/json/JSONModel"
], function(BaseController, Button, Dialog, MessageToast, Text, JSONModel) {
	"use strict";

	return BaseController.extend("YL_SCI_EXYardLogistics.controller.Camera", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf YL_SCI_EXYardLogistics.view.Camera
		 */
		openALPRSecretKey: "sk_91fa84e8508f1bcc51deeda8",
		onInit: function() {
			this.getView().setModel(new JSONModel({
				photos: []
			}));
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

		onSnapshot: function(oEvent) {
			// The image is inside oEvent on the image parameter
			var oModel = this.getView().getModel();
			var that = this;
			// build a fake network request to the base64 image to use
			// the fetch API to create the blob
			fetch(oEvent.getParameter("image")).then(function(res) {
				return res.blob();
			}).then(function(blob) {
				var aPhotos = oModel.getProperty("/photos");
				var blobSource = URL.createObjectURL(blob);
				aPhotos.push({
					src: blobSource
				});
				oModel.setProperty("/photos", aPhotos);

				var formData = new FormData();
				/* eslint-disable sap-no-dom-insertion */
				formData.append("image", blob);
				/* eslint-enable sap-no-dom-insertion */
				/* eslint-disable sap-no-hardcoded-url */
				fetch("https://api.openalpr.com/v2/recognize?country=eu&secret_key=" + that.openALPRSecretKey, {
					method: "POST",
					body: formData
				}).then(function(resp) {
					return resp.ok ? resp.json() : Promise.Reject(resp.text());
				}).then(function(resp) {
					aPhotos = oModel.getProperty("/photos");
					for (var i = 0; i < aPhotos.length; i++) {
						if (aPhotos[i].src === blobSource) {
							if (resp.results.length > 0) {
								aPhotos[i].licensePlate = resp.results[0].plate;
							} else {
								aPhotos[i].licensePlate = "No license plate recognized!";
							}
						}
					}
					oModel.setProperty("/photos", aPhotos);
				});
				/* eslint-enable sap-no-hardcoded-url */
			});
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