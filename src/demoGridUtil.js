
define([
    'dojo/dom',
    "dojo/dom-construct"
], function(dom,domConstruct){
    return {
        // To generate select option items.
    	kindColumnFormatter : function(item, rowIndex, cell){
    		
    		//var store = cell.grid.store;
    		//var owner = store.getValue(item, "owner")
    		//console.log("kind--", item, rowIndex, cell, store, owner);
    		return "<div>"+item.kind.toString()+"</div>";
    	},
    	
    	titleColumnFormatter : function(item, rowIndex, cell){
    		
    		return "<div>"+item.title.toString()+"</div>";
    	},
    	
    	lastmodifiedColumnFormatter : function(item, rowIndex, cell){
    		
    		return "<div>"+item.lastmodified.toString()+"</div>";
    	},
    	
    	lastmodifiedColumnFormatter : function(item, rowIndex, cell){
    		
    		return "<div>"+item.metadatalastmodified.toString()+"</div>";
    	},
    	
    	checkedoutColumnFormatter : function(item, rowIndex, cell){
    		
    		return "<div>"+item.checkedout.toString()+"</div>";
    	}
    };
  
});
