var mMoneda = Backbone.Model.extend({
	urlRoot:"http://api.fixer.io/",
	defaults:{
		base:'USD',
		mon2:'EUR',
		fecha:'latest'
	},
	url:function(){
		if(this.get('fecha')){
			return this.urlRoot+this.get('fecha')+'?base='+this.get('base')
		}else{
			//return this.urlRoot+'latest'
		}
	},
	initialize:function(){
		this.on('change',this.ajustaDatos)
	},
	ajustaDatos:function(data){
		var value = data.get('rates')[data.get('mon2')]
		this.set({value:value})
	},
})