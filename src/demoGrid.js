define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojox/grid/EnhancedGrid",
    "dojo/data/ItemFileWriteStore",
    "dojo/dom-construct",
    "dojo/_base/lang",
    "dojo/dom-style",
    "dojo/dom-class",
    'dojo/query',
    'dojo/on',
    "./demoGridUtil",
    'dojo/text!../json/gridResponse.json',
    "dojo/text!./templates/demoGrid.html",
    "dojo/topic",
    "dojox/grid/enhanced/plugins/IndirectSelection",
    "dojox/grid/enhanced/plugins/DnD",
    "dojox/grid/enhanced/plugins/Selector",
    "dojox/grid/enhanced/plugins/Pagination",
    "dojox/layout/ScrollPane",
    "dojo/domReady!",
    "dijit/layout/ContentPane"
], function(declare, _WidgetBase, _TemplatedMixin,_WidgetsInTemplateMixin, EnhancedGrid,ItemFileWriteStore, domConstruct,lang,domStyle,domClass,query, on, eDMSGridUtil,gridResponse,Template, topic, IndirectSelection, dnd, _Selector, Pagination,ScrollPane){
    return declare([ _WidgetBase, _TemplatedMixin,_WidgetsInTemplateMixin], {

        templateString: Template,

        postCreate: function() {
            this.gridData = JSON.parse(gridResponse);
            this.loadGridData();
            this._initScrollPane();

        },

        createItemStore : function(){
            var data = {
                items: []
            };

            var jsonObj = this.gridData;
            var items = [];
            if(jsonObj && jsonObj.data && jsonObj.data.records){
                items =  jsonObj.data.records;
            }
            if(items instanceof Array){
                data.items = items;
            } else {
                var temp = [];
                temp.push(items);
                data.items.push(temp);
                items = temp;
            }
            return data;
        },
        _initScrollPane: function(){
            if(!this.scrollPane){
                if(this.scrollEvt){
                    this.scrollEvt.remove();
                }
                this.scrollPane = new ScrollPane({
                    orientation: "vertical"
                });
                this.scrollEvt = this.scrollPane.on('scroll', lang.hitch(this, this._initScrollPane));
            }
        },

        loadGridData : function() {
            var style = "height:500px;width:auto";
            if(this.gridMenu){
                domConstruct.empty(this.gridMenu);
            }

            try{
                var data= this.createItemStore();
                var store = new ItemFileWriteStore({data:data});
                /*create a new grid*/
                this.grid = new EnhancedGrid({
                    store: store,
                    structure: this.createGridColumns(),
                    autoHeight:false,
                    autoWidth:true,
                    rowHeight:30,
                    pageCount:10,
                    //rowSelector: '20px',
                    //style:style,
                    className:"edmsGrid",
                    plugins: {
                        indirectSelection: {headerSelector:true, width:"90px", styles:"text-align: center;"},
                        dnd:{
                            copyOnly: false,
                            dndConfig: {
                                within:{
                                    row:true,
                                    cell:false
                                },
                                in: false,
                                out: false
                            }
                        },
                        selector:{
                            cell: false,
                            col:false
                        },
                        pagination: {
                            //pageSizes: ["10", "20", "30", "All"],
                            description: true,
                            sizeSwitch: false,
                            pageStepper: true,
                            /*page step to be displayed*/
                            maxPageStep: 5,
                            /*position of the pagination bar*/
                            position: "bottom"
                        }
                    }
                }, document.createElement('div'));
                //domStyle.set(grid.domNode,"margin-top","100px");
                this.grid.domNode.style= style;
                domConstruct.place(this.grid.domNode, this.gridMenu);

                this.grid.startup();

                if(this.grid && this.grid.update){
                    this.grid.update();
                }

            }catch(e){
                console.log("error--->" ,e);
            }


        },
        setIdentifierForNewItem: function(item, store, index){
            var attrs = store.getIdentityAttributes(item);
            for(var i = attrs.length - 1; i >= 0; --i){
                item[attrs[i]] = index + (new Date()).getTime();
            }
            return item;
        },

        createGridColumns : function(){

            if(this.gridData && this.gridData && this.gridData.gridMetaData){

                var metadata = this.gridData.gridMetaData;
                var columns = [];
                for(var i in metadata){
                    var obj = {};
                    //obj.field = metadata[i].fieldName;
                    obj.field = "_item";
                    obj.name = metadata[i].name;
                    //obj.className = metadata[i].id;
                    //obj.width = "150px";
                    obj.formatter = eDMSGridUtil[metadata[i].formatter];
                    //obj.minWidth = metadata[i].minWidth || 100;
                    obj.width = metadata[i].maxWidth + "px" || "200px";
                    obj.clientSort = metadata[i].sortable || false;
                    //obj.descending = ((metadata[i].defaultSort == "Desc")? true : false) || false;

                    columns.push(obj);
                }
                return columns;
            }


        }



    });
});