sap.ui.define([
	"apps/dflc/salesorderts/controller/BaseController.controller",
	"sap/ui/core/UIComponent",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/BindingMode"
], function(__BaseController, UIComponent, MessageToast, JSONModel, BindingMode) {
	"use strict";

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
	}
	
	var BaseController = _interopRequireDefault(__BaseController); // Interfaces

	var OrderDetail =  BaseController.extend("apps.dflc.salesorderts.YY1_SLSMEX_DFLC.controller.OrderDetail", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf apps.dflc.salesorderts.YY1_SLSMEX_DFLC.view.OrderDetail
		 */
		constructor: function varructor() {
			BaseController.prototype.constructor.apply(this, arguments);
			this.formMode = "I";
		},

		onInit: function _onInit() {
			var oRouter = UIComponent.getRouterFor(this);
			if (oRouter) {
				oRouter.getRoute("RouteOrderDetail").attachMatched(this._onRouteMatchedDetail, this);
			}
		},
		
		createEmptyOrderObject: function _createEmptyOrderObject() {
			return {
				SalesOrderID: "",
				CreationDateTime: null,
				CreatedBy: "",
				CustomerID: "",
				TotalItems: 0.0,
				TotalFreight: 0,
				TotalOrder: 0.0,
				Status: "",
				toItem: []
			};
		},

		_onRouteMatchedDetail: function _onRouteMatchedDetail(oEvent) {
			var oView = this.getView();
			var oArgs = oEvent.getParameter("arguments");
			var sSalesOrderID = oArgs.SalesOrderID;
			var oModel = this.getOwnerComponent().getModel();

			// Clear data
			var oJSONModel = new JSONModel(this.createEmptyOrderObject());
			oJSONModel.setDefaultBindingMode(BindingMode.TwoWay);
			(oView.byId("SalesOrder.CreationDateTime")).setEditable(false);
			(oView.byId("SalesOrder.CreatedBy")).setEditable(false);
			(oView.byId("SalesOrder.CustomerID")).setValueState("None");
			oView.setBusy(true);

			// Header
			oModel.read(`/SalesOrderHeaders(${sSalesOrderID})`, {
				success: (oOrdem, oResponse) => {
					// Items
					oModel.read(`/SalesOrderHeaders(${sSalesOrderID})/toItem`, {
						success: (oData, oResponse) => {
							oOrdem.toItem = oData.results;
							oJSONModel.setData(oOrdem);
							oView.setModel(oJSONModel);
							this.recalcOrder();
							oView.setBusy(false);
						},
						error: oError => {
							try {
								var oParsedError = JSON.parse(oError.responseText);
								MessageToast.show(oParsedError.error.message.value);
							} catch (parseError) {
								MessageToast.show("Error loading order items");
							}
							oView.setBusy(false);
						}
					});
				},
				error: oResponse => {
					try {
						var oError = JSON.parse(oResponse.responseText);
						MessageToast.show(oError.error.message.value);
					} catch (parseError) {
						MessageToast.show("Error loading order header");
					}
					oView.setBusy(false);
				}
			});
		},
		
		recalcOrder: function _recalcOrder() {
			const oView = this.getView();
			const oModel = oView.getModel();
			const oOrder = this.getOrderObject();
			oModel.setData(oOrder);
			oView.setModel(oModel);
		},
		
		getOrderObject: function _getOrderObject() {
			const oView = this.getView();
			const oModel = oView.getModel();
			const oOrder = oModel.getData();

			// Header
			oOrder.SalesOrderID = this.parseInt(oOrder.SalesOrderID);
			oOrder.TotalFreight = this.parsePrice(oOrder.TotalFreight);

			// Items
			oOrder.TotalItems = 0;
			for (const item of oOrder.toItem) {
				item.Quantity = this.parseInt(item.Quantity);
				item.UnitPrice = this.parsePrice(item.UnitPrice);
				item.TotalPrice = Number(item.Quantity) * Number(item.UnitPrice);
				oOrder.TotalItems += Number(item.TotalPrice);
			}
			oOrder.TotalOrder = Number(oOrder.TotalItems) + Number(oOrder.TotalFreight);
			return oOrder;
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf apps.dflc.salesorderts.YY1_SLSMEX_DFLC.view.OrderDetail
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf apps.dflc.salesorderts.YY1_SLSMEX_DFLC.view.OrderDetail
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf apps.dflc.salesorderts.YY1_SLSMEX_DFLC.view.OrderDetail
		 */
		//	onExit: function() {
		//
		//	}

	});
	
	return OrderDetail;

});