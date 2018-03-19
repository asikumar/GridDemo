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
    "./demoGridUtil",
    'dojo/text!../json/gridResponse.json',
    "dojo/text!./templates/demoGrid.html",
    "dojo/topic",
    "dojox/grid/enhanced/plugins/IndirectSelection",
    "dojox/grid/enhanced/plugins/DnD",
    "dojo/domReady!",
    "dijit/layout/ContentPane"
], function(declare, _WidgetBase, _TemplatedMixin,_WidgetsInTemplateMixin, EnhancedGrid,ItemFileWriteStore, domConstruct,lang,domStyle,domClass,eDMSGridUtil,gridResponse,Template, topic, IndirectSelection, dnd){
    return declare([ _WidgetBase, _TemplatedMixin,_WidgetsInTemplateMixin], {

        templateString: Template,

        postCreate: function() {
            this.gridData = JSON.parse(gridResponse);
            this.loadGridData();
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

        loadGridData : function() {
            var style = "height:500px;width:800px"
            if(this.gridMenu){
                domConstruct.empty(this.gridMenu);
            }

            try{
                var data= this.createItemStore();
                var store = new ItemFileWriteStore({data:data});
                /*create a new grid*/
                var grid = new EnhancedGrid({
                    store: store,
                    structure: this.createGridColumns(),
                    //style:style,
                    className:"edmsGrid",
                    autoHeight:true,
                    autoWidth:true,
                    rowSelector: '20px',
                    plugins: {
                        indirectSelection: {headerSelector:true, width:"40px", styles:"text-align: center;"},
                        dnd:{
                            copyOnly: false,
                            dndConfig: {
                                //row: {
                                //    out: false, // This rule has lower priority, it'll be overwritten.
                                //    within: false
                                //},
                                //// Both orders are correct.
                                //out: {
                                //    row: true, // This rule has higher priority, it'll be valid.
                                //    cell: false
                                //},
                                // Set a whole group of situations
                                within:true,
                                in: true
                            }
                        }
                    }
                }, document.createElement('div'));
                //domStyle.set(grid.domNode,"margin-top","100px");
                //grid.domNode.style= style;
                domConstruct.place(grid.domNode, this.gridMenu);

                grid.startup();

                if(grid && grid.update){
                    grid.update();
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