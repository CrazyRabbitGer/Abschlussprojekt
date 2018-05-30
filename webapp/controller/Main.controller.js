sap.ui.define([
	"./BaseController",
	"sap/m/MessageBox",
	'sap/m/MessageToast'
], function(BaseController, MessageBox, MessageToast) {
	"use strict";

	return BaseController.extend("YL_SCI_EXYardLogistics.controller.Main", {

		onInit: function() {

		},

		onLogin: function() {

			var oView = this.getView();
			var username = oView.byId("UsernameInput").getValue();
			var passwort = oView.byId("PasswordInput").getValue();
			var oModel = this.getOwnerComponent().getModel();
			var that = this;
			var key = oModel.createKey("/YL_CAMEX_LOGINSet", {
				Username: username
			});
			
			oModel.read(key, {
				success: function(oData) {
					var Pass = oData.Password;
					if (passwort === Pass) {
						MessageToast.show("Herzlich Willkommen, " + username + "!");
					that.getRouter().getTargets().display("camera");	
					} else {
						MessageBox.error(
							"Login fehlgeschlagen - Passwort prüfen");
					}
				},
				error: function() {
					MessageBox.alert("User nicht bekannt");
				}
				

			});

		}
	});
});