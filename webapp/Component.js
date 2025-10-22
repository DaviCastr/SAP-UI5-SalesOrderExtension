jQuery.sap.declare("apps.dflc.salesorderts.YY1_SLSMEX_DFLC.Component");
// use the load function for getting the optimized preload file if present
sap.ui.component.load({
	name: "apps.dflc.salesorderts",
	// Use the below URL to run the extended application when SAP-delivered application is deployed on SAPUI5 ABAP Repository
	url: "/sap/bc/ui5_ui5/sap/YY1_SLSMTS_DFLC" // we use a URL relative to our own component
		// extension application is deployed with customer namespace
});
this.apps.dflc.salesorderts.Component.extend("apps.dflc.salesorderts.YY1_SLSMEX_DFLC.Component", {
	metadata: {
		manifest: "json"
	}
});