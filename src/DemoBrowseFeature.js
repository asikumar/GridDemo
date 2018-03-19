define([
	"dojo/_base/declare",
	"dijit/_WidgetBase",
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",
	"ecm/widget/layout/_LaunchBarPane",
	"dojo/dom-construct",
	"./demoGrid",
	"ecm/model/Request",
	"dojo/_base/lang",
	"dojo/text!./templates/DemoBrowseFeature.html",
	"dojo/domReady!"
],
function(declare,_WidgetBase,_TemplatedMixin, _WidgetsInTemplateMixin,
		_LaunchBarPane,domConstruct,eDMSGrid,Request,lang,
		template) {
	/**
	 * @name eDMSBrowsePluginDojo.EDMSBrowseFeature
	 * @class 
	 * @augments ecm.widget.layout._LaunchBarPane
	 */
	return declare("src.EDMSBrowseFeature", [
		_WidgetBase,_TemplatedMixin, _WidgetsInTemplateMixin,_LaunchBarPane
	], {
		/** @lends eDMSBrowsePluginDojo.EDMSBrowseFeature.prototype */

		templateString: template,
		
		// Set to true if widget template contains DOJO widgets.
		widgetsInTemplate: true,

		postCreate: function() {
			this.logEntry("postCreate");
			this.inherited(arguments);
			
			/**
			 * Add custom logic (if any) that should be necessary after the feature pane is created. For example,
			 * you might need to connect events to trigger the pane to update based on specific user actions.
			 */
			try{
//				var grid = new eDMSGrid(this.sampleGridData());
//				console.log("GGGG--", grid);
//				grid.startup();
				//grid.placeAt("gridMenu");
				var data = new eDMSGrid(this.sampleGridData());	
				domConstruct.place(data.domNode, this.gridContainer);
				data.startup();
			}catch(e){
				console.log("Error--",e);
			}
			
			this.logExit("postCreate");
		},
		
		/**
		 * Optional method that sets additional parameters when the user clicks on the launch button associated with 
		 * this feature.
		 */
		setParams: function(params) {
			this.logEntry("setParams", params);
			
			if (params) {
				
				if (!this.isLoaded && this.selected) {
					this.loadContent();
				}
			}
			
			this.logExit("setParams");
		},

		/**
		 * Loads the content of the pane. This is a required method to insert a pane into the LaunchBarContainer.
		 */
		loadContent: function() {
			this.logEntry("loadContent");
			
			if (!this.isLoaded) {
				/**
				 * Add custom load logic here. The LaunchBarContainer widget will call this method when the user
				 * clicks on the launch button associated with this feature.
				 */
				this.isLoaded = true;
				this.needReset = false;
			}
			
			this.logExit("loadContent");
		},

		/**
		 * Resets the content of this pane.
		 */
		reset: function() {
			this.logEntry("reset");
			
			/**
			 * This is an option method that allows you to force the LaunchBarContainer to reset when the user
			 * clicks on the launch button associated with this feature.
			 */
			this.needReset = false;
			
			this.logExit("reset");
		},
		
		sampleGridData : function(){
			
			
			return {
				  "Response": {
					    
				      "status": "SUCCESS",
				      "message": "",
				      "error": [],
				      "gridMetaData": [
				        
				        {
				        "id": "kind", 
				        "name":"Kind",
				        "fieldName":"kind",
				        "minWidth":20,
				        "maxWidth":100,
				        "displaySequence":1,
				        "sortable":true,
				        "addHide": true,
				        "dataType": "String",
				        "formatter": "kindColumnFormatter"
				        },

				        {
				        "id": "title",
				        "name":"Title",
				        "fieldName":"title",
				        "minWidth":100,
				        "maxWidth":200,
				        "displaySequence":2,
				        "sortable":true,
				        "addHide": true,
				        "dataType": "String",
				        "formatter": "titleColumnFormatter"
				      },

				        {
				        "id": "lastmodified",
				        "name":"Last Modified",
				        "fieldName":"lastmodified" ,
				        "minWidth":100,
				        "maxWidth":200,
				        "displaySequence":3,
				        "sortable":true,
				        "addHide": true,
				        "dataType": "String",
				        "formatter": "lastmodifiedColumnFormatter"
				      },

				        {
				        "id": "metadatalastmodified",
				        "name":"Metedata Last Modified",
				        "fieldName":"metadatalastmodified" , 
				        "minWidth":100,
				        "maxWidth":200,
				        "displaySequence":1,
				        "sortable":true,
				        "addHide": true,
				        "dataType": "String",
				        "formatter": "lastmodifiedColumnFormatter"
				      },

				        {
				        "id": "checkedout",
				        "name":"Checked Out by",
				        "fieldName":"checkedout",
				        "minWidth":100,
				        "maxWidth":200,
				        "displaySequence":4,
				        "sortable":true,
				        "addHide": true,
				        "dataType": "String",
				        "formatter": "checkedoutColumnFormatter"
				      }
				      ],
				      "data": {
				        "noOfRecords:": 100,
				        "currentRecords":"10",
				        "records":[{
				          "kind": "Document(logo)",
				          "title": "Hiring Plans",
				          "lastmodified": "04-14-2016 04:30 PM",
				          "metadatalastmodified": "03-8-2018 02:30PM",
				          "checkedout" : "John",
				          "version": 1,
				          "owner": "Justin",
				          "iconClass": "icon-png",
				          "documentId":"{906A9161-0000-xxx}",
				          "versionDocumentId": "{906A9161-0000-xxxx}",
				          "mimeType": "application/pdf"
				        },
				        {
				          "kind": "Folder(logo)",
				          "title": "All Employees",
				          "lastmodified": "02-14-2017 04:30 PM",
				          "metadatalastmodified": "06-4-2018 02:30PM",
				          "checkedout": "Peter",
				          "version": 1.7,
				          "owner": "Lee",
				          "iconClass": "icon-png",
				          "documentId":"{906A9161-0000-C216-B639-xx}",
				          "versionDocumentId": "{906A9161-0000-C216-B639-04xxx}",
				          "mimeType": "application/pdf"
				        },
				        {
				          "kind": "Document(logo)",
				          "title": "John Doe Record",
				          "lastmodified": "07-14-2014 09:30 PM",
				          "metadatalastmodified": "06-8-2018 2:30 PM",
				          "checkedout": "Sandra",
				          "version": 1,
				          "owner": "Justin",
				          "iconClass": "icon-png",
				          "documentId":"{906A9161-0000-C216-B639-0445xx}",
				          "versionDocumentId": "{906A9161-0000-C216-B639-0445F3xxxx}",
				          "mimeType": "application/pdf"
				        },
				        {
				          "kind": "Document(logo)",
				          "title": "Finance Data",
				          "lastmodified": "07-14-2014 09:30 PM",
				          "metadatalastmodified": "06-8-2018 2:30 PM",
				          "checkedout": "Sara",
				          "version": 1,
				          "owner": "Justin",
				          "iconClass": "icon-png",
				          "documentId":"{906A9161-0000-C216-B639-0445F32xxx}",
				          "versionDocumentId": "{906A9161-0000-C216-B639-0445F3xxx}",
				          "mimeType": "application/pdf"
				        }]
				      }
				    
				  }
				}


			
			
			
			
			
			
			
			
			
			
//			return {
//			    "Response": {
//			      
//			        "status": "SUCCESS",
//			        "message": "",
//			        "error": [],
//			        "gridMetaData": [
//			          
//			          {"title":"Kind",
//			          "fieldName":"kind",
//			          "minWidth":20,
//			          "maxWidth":20,
//			          "displaySequence":1,
//			          "sortable":true
//
//			          	},
//
//			          {
//			          "title":"Title",
//			          "fieldNameName":"title",
//			          "minWidth":20,
//			          "maxWidth":20,
//			          "displaySequence":2,
//			          "sortable":true
//			          
//			          	},
//
//			          {"title":"Last Modified",
//			          "fieldNameName":"lastmodified" ,
//			          "minWidth":20,
//			          "maxWidth":100,
//			          "displaySequence":3,
//			          "sortable":true
//
//			          	},
//
//			          {"title":"Metedata Last Modified",
//			           "fieldNameName":"metadatalastmodified" , 
//			          "minWidth":20,
//			          "maxWidth":100,
//			          "displaySequence":1,
//			          "sortable":true
//
//			          	},
//
//			          {"title":"Checked Out by",
//			           "fieldName":"checkedout",
//			          "minWidth":20,
//			          "maxWidth":200,
//			          "displaySequence":4,
//			          "sortable":true
//
//			          	}
//			        ],
//			        "data": {
//			          "noOfRecords:": 100,
//			          "currentRecords":"10",
//			          "records":[{
//			            "kind": "Document(logo)",
//			            "title": "Hiring Plans",
//			            "lastmodified": "04-14-2016 04:30 PM",
//			            "metadatalastmodified": "03-8-2018 02:30PM",
//			            "checkedout" : "John",
//			            "version": 1,
//			            "owner": "Justin"
//			          },
//			          {
//			            "kind": "Folder(logo)",
//			            "title": "All Employees",
//			            "lastmodified": "02-14-2017 04:30 PM",
//			            "metadatalastmodified": "06-4-2018 02:30PM",
//			            "checkedout": "Peter",
//			            "version": 1.7,
//			            "owner": "Lee"
//			          },
//			          {
//			            "kind": "Document(logo)",
//			            "title": "John Doe Record",
//			            "lastmodified": "07-14-2014 09:30 PM",
//			            "metadatalastmodified": "06-8-2018 2:30 PM",
//			            "checkedout": "Sandra",
//			            "version": 1,
//			            "owner": "Justin"
//			          },
//			          {
//			            "kind": "Document(logo)",
//			            "title": "Finance Data",
//			            "lastmodified": "07-14-2014 09:30 PM",
//			            "metadatalastmodified": "06-8-2018 2:30 PM",
//			            "checkedout": "Sara",
//			            "version": 1,
//			            "owner": "Justin"
//			          }]
//			        }
//			      
//			    }
//			  }

		}
	});
});
