sap.ui.define([
		"YL_SCI_EXYardLogistics/controller/BaseController",
		"sap/ui/model/json/JSONModel"
], function(BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("YL_SCI_EXYardLogistics.controller.App", {

			onInit : function () {
				var oViewModel,
					 fnSetAppNotBusy,
					iOriginalBusyDelay = this.getView().getBusyIndicatorDelay();

				oViewModel = new JSONModel({
					busy : false,
					delay : 0
				});
				this.setModel(oViewModel, "appView");

				fnSetAppNotBusy = function() {
					oViewModel.setProperty("/busy", false);
					oViewModel.setProperty("/delay", iOriginalBusyDelay);
				};

			//	apply content density mode to root view
				this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
			}

	});

});