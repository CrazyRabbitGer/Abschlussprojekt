sap.ui.define([
	"sap/ui/core/Control"

], function(Control) {
	"use strict";
	return Control.extend("salt.YardLogistics.custom-controls.barrier", {
		metadata: {
			properties: {
				opened: {
					type: "boolean",
					defaultValue: false
				}
			}
		},
		renderer: function(oRM, oControl) {
			oRM.write("<div");
			oRM.writeControlData(oControl);
			oRM.addClass("barrier-wrapper");
			oRM.writeClasses();
			oRM.write(">");
			oRM.write("<div");
			oRM.addClass("barrier-holder");
			oRM.writeClasses();
			oRM.write("/>");
			oRM.write("<div");
			oRM.addClass("barrier-bar");
			if (oControl.getOpened()) {
				oRM.addClass("open");
			} else {
				oRM.addClass("close");
			}
			oRM.writeClasses();
			oRM.write("/>");
			oRM.write("</div>");
		}
	});
});