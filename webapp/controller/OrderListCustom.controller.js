sap.ui.define([
	"sap/m/MessageToast",
	"sap/ui/core/UIComponent",
	"apps/dflc/salesorderts/controller/BaseController.controller"
], function(MessageToast, UIComponent, __BaseController) {
	"use strict";

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
	}
	var BaseController = _interopRequireDefault(__BaseController); // Interfaces

	var OrderList = sap.ui.controller("apps.dflc.salesorderts.YY1_SLSMEX_DFLC.controller.OrderListCustom", {
		// varructor: function varructor() {
		// 	BaseController.prototype.varructor.apply(this, arguments);
		// 	this.oDialogMessageList = null;
		// 	this.aUpdateStatusQueue = [];
		// 	// Status update queue array
		// 	this.aUpdateStatusMessages = [];
		// },
		// Status messages array
		onInit: function() {
			// var oView = this.getView();
			// var oFModel = new JSONModel();
			// oFModel.setData({
			// 	"SalesOrderID": "",
			// 	"CreationDateTime": null,
			// 	"CreatedBy": "",
			// 	"CustomerID": "",
			// 	"TotalItems": 0,
			// 	"TotalFreight": 0,
			// 	"TotalOrder": 0,
			// 	"Status": "",
			// 	"OrderField": "SalesOrderID",
			// 	"OrderType": "ASC",
			// 	"Limite": 25,
			// 	"Ignore": 0
			// });
			// oView?.setModel(oFModel, "filter");
			// var oTModel = new JSONModel();
			// oTModel.setData([]);
			// oView?.setModel(oTModel, "table");
			var oRouter = UIComponent.getRouterFor(this);
			// oRouter.getRoute("RouteOrderList").attachMatched(this._onRouteMatchedList, this);

			oRouter.addRoute({
				name: "RouteOrderDetail",
				viewPath: "apps.dflc.salesorderts.YY1_SLSMEX_DFLC.view",
				pattern: "SalesOrderHeaders({SalesOrderID})/detail",
				target: "TargetOrderDetail"
			});

			oRouter.getTargets().addTarget("TargetOrderDetail", {
				viewName: "OrderDetail",
				viewPath: "apps.dflc.salesorderts.YY1_SLSMEX_DFLC.view",
				viewLevel: 1,
				// id="application-toBeTested-component---App--app"
				//controlId: "__xmlview0--container-component---App--app",
				parent: "base"
			});

			oRouter.initialize();

			var i18nModel = new sap.ui.model.resource.ResourceModel({
				bundleUrl: "i18n/i18n.properties"
			});
			
			this.getOwnerComponent().setModel(i18nModel, "i18n");

			MessageToast.show("Extension Controller initialize");
		},

		onDetail: function(oEvent) {

			var oSource = oEvent.getSource();
			var sSalesOrderID = oSource.data("SalesOrderID");

			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("RouteOrderDetail", {
				SalesOrderID: sSalesOrderID
			});
		},

		// onFilterReset: function _onFilterReset() {
		// 	// Implement reset logic here
		// 	var oView = this.getView();
		// 	var oFModel = oView ? .getModel("filter");
		// 	oFModel.setData({
		// 		"SalesOrderID": "",
		// 		"CreationDateTime": null,
		// 		"CreatedBy": "",
		// 		"CustomerID": "",
		// 		"TotalItems": 0,
		// 		"TotalFreight": 0,
		// 		"TotalOrder": 0,
		// 		"Status": "",
		// 		"OrderField": "SalesOrderID",
		// 		"OrderType": "ASC",
		// 		"Limite": 25,
		// 		"Ignore": 0
		// 	});
		// },
		// onFilterSearch: function _onFilterSearch(oEvent) {
		// 	var oView = this.getView();
		// 	var oModel = this.getOwnerComponent() ? .getModel();
		// 	var oTable = oView ? .byId("table1");
		// 	var oFModel = oView ? .getModel("filter");
		// 	var oTModel = oView ? .getModel("table");
		// 	var oFData = oFModel.getData();
		// 	var aParams = [];
		// 	var aSorter = [];
		// 	var aFilters = [];

		// 	// Applying filters
		// 	if (oFData.SalesOrderID !== '') {
		// 		var oFilter = new Filter({
		// 			path: 'SalesOrderID',
		// 			operator: FilterOperator.EQ,
		// 			value1: oFData.SalesOrderID
		// 		});
		// 		aFilters.push(oFilter);
		// 	}
		// 	if (oFData.CustomerID !== '') {
		// 		var oFilter = new Filter({
		// 			path: 'CustomerID',
		// 			operator: FilterOperator.EQ,
		// 			value1: oFData.CustomerID
		// 		});
		// 		aFilters.push(oFilter);
		// 	}

		// 	// Applying sorting
		// 	var bDescending = oFData.OrderType === "DESC";
		// 	if (oFData.OrderField !== '') {
		// 		var oSort = new Sorter(oFData.OrderField, bDescending);
		// 		aSorter.push(oSort);
		// 	}

		// 	// Limit and offset
		// 	aParams.push(`$top=${oFData.Limite}`);
		// 	aParams.push(`$skip=${oFData.Ignore}`);

		// 	// Executing filter
		// 	oView ? .setBusy(true);
		// 	oModel.read("/SalesOrderHeaders", {
		// 		sorters: aSorter,
		// 		filters: aFilters,
		// 		urlParameters: aParams,
		// 		success: (oData, oResponse) => {
		// 			oView ? .setBusy(false);
		// 			oTModel.setData(oData.results);
		// 		},
		// 		error: oError => {
		// 			oView ? .setBusy(false);
		// 			MessageToast.show("Erro ao carregar dados");
		// 			console.error("Error loading data:", oError);
		// 		}
		// 	});
		// },
		// onNew: function _onNew(oEvent) {
		// 	var oRouter = UIComponent.getRouterFor(this);
		// 	oRouter.navTo("RouteOrderNew");
		// },
		// onEdit: function _onEdit(oEvent) {
		// 	var oSource = oEvent.getSource();
		// 	var sSalesOrderID = oSource.data("SalesOrderID");
		// 	var oRouter = UIComponent.getRouterFor(this);
		// 	oRouter.navTo("RouteOrderEdit", {
		// 		SalesOrderID: sSalesOrderID
		// 	});
		// },
		// onDelete: function _onDelete(oEvent) {
		// 	var oSource = oEvent.getSource();
		// 	var sSalesOrderID = oSource.data("SalesOrderID");
		// 	this.onDeleteOrder(sSalesOrderID, sStatus => {
		// 		if (sStatus === 'S') {
		// 			this.onFilterSearch();
		// 		}
		// 	});
		// },
		// onChangeStatus: function _onChangeStatus(sStatus) {
		// 	var oView = this.getView();
		// 	var oTable = oView ? .byId("table1");
		// 	var oTableModel = oView ? .getModel("table");
		// 	var aData = oTableModel.getData();
		// 	var aIndex = oTable.getSelectedIndices();
		// 	if (aIndex.length === 0) {
		// 		var sMessage = this._getI18nText("selectAtLeastOneItem");
		// 		MessageToast.show(sMessage);
		// 		return;
		// 	}
		// 	this.aUpdateStatusQueue = [];
		// 	this.aUpdateStatusMessages = [];
		// 	for (var iIndex of aIndex) {
		// 		try {
		// 			var sSalesOrderID = aData[iIndex].SalesOrderID;
		// 			this.aUpdateStatusQueue.push({
		// 				SalesOrderID: sSalesOrderID,
		// 				Status: sStatus
		// 			});
		// 		} catch (e) {
		// 			console.error("Error processing selected item:", e);
		// 			console.log("Index:", iIndex);
		// 		}
		// 	}
		// 	this.runUpdateStatusQueue();
		// },
		// runUpdateStatusQueue: function _runUpdateStatusQueue() {
		// 	var oQueue = this.aUpdateStatusQueue.pop();
		// 	if (oQueue === undefined) {
		// 		this.getView() ? .setBusy(false);
		// 		this.onOpenMessageListDialog(this.aUpdateStatusMessages);
		// 		this.onFilterSearch();
		// 		return;
		// 	}
		// 	var oModel = this.getOwnerComponent() ? .getModel();
		// 	this.getView() ? .setBusy(true);
		// 	oModel.callFunction("/UPDATE_ORDER_STATUS", {
		// 		method: "GET",
		// 		urlParameters: {
		// 			SalesOrderID: oQueue.SalesOrderID,
		// 			Status: oQueue.Status
		// 		},
		// 		success: (oData, response) => {
		// 			for (var oResult of oData.results) {
		// 				this.aUpdateStatusMessages.push(oResult);
		// 			}
		// 			this.runUpdateStatusQueue();
		// 		},
		// 		error: oResponse => {
		// 			try {
		// 				var oError = JSON.parse(oResponse.responseText);
		// 				var sErrorMessage = this._getI18nText("errorUpdatingOrderWithMessage").replace("{0}", oQueue.SalesOrderID).replace("{1}",
		// 					oError.error.message.value);
		// 				this.aUpdateStatusMessages.push({
		// 					"Type": "E",
		// 					"Message": sErrorMessage
		// 				});
		// 			} catch (e) {
		// 				var sErrorMessage = this._getI18nText("errorUpdatingOrder").replace("{0}", oQueue.SalesOrderID);
		// 				this.aUpdateStatusMessages.push({
		// 					"Type": "E",
		// 					"Message": sErrorMessage
		// 				});
		// 			}
		// 			this.runUpdateStatusQueue();
		// 		}
		// 	});
		// },
		// onOpenMessageListDialog: function _onOpenMessageListDialog(aMessageList) {
		// 	var sName = "apps.dflc.salesorderts.view.MessageList";
		// 	var oModel = new JSONModel(aMessageList);
		// 	this.getView() ? .setModel(oModel, "messageList");
		// 	if (!this.oDialogMessageList) {
		// 		this.loadFragment({
		// 			name: sName
		// 		}).then(oDialog => {
		// 			this.oDialogMessageList = oDialog;
		// 			this.oDialogMessageList.open();
		// 		}).catch(oError => {
		// 			console.error("Error loading fragment:", oError);
		// 			MessageToast.show(this._getI18nText("errorLoadingDialog"));
		// 		});
		// 	} else {
		// 		this.oDialogMessageList.open();
		// 	}
		// },
		// onCloseMessageListDialog: function _onCloseMessageListDialog() {
		// 	var oDialog = this.byId("MessageListDialog");
		// 	if (oDialog) {
		// 		oDialog.close();
		// 	}
		// },
		_onRouteMatchedList: function (oEvent) {
			this.onFilterSearch();
		}
	});
	return OrderList;
});