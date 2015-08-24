var cMoneda = Backbone.Collection.extend({
	model: mMoneda,
	initialize: function(){

	},
	traeRango:function(base, otro){
		var self = this
		var p = []
		var fecha = new Date()
	    var año = fecha.getFullYear();
	    var mes = fecha.getMonth() + 1; //Months are zero based
	    var dia = fecha.getDate();
	    for(i = 0 ; i<= 7 ; i++){
	    	if(dia==0){
	    		mes--
	    		var f = new Date(año,mes,dia)
	    		dia = f.getDate()
	    	}
	    	var model = new mMoneda({fecha:año+'-'+(mes<=9 ? '0' + mes : mes) +'-'+(dia <= 9 ? '0' + dia : dia), base:base, mon2:otro})
	    	p.push(model)
	    	dia--
	    }
	    this.add(p.reverse())
	    return $.when(p[0].fetch(),p[1].fetch(),p[2].fetch(),p[3].fetch(),p[4].fetch(),p[5].fetch(),p[6].fetch(),p[7].fetch())
	},
	getDataGraf: function(){
		var resp = {
			label:[],
			data:[]
		}

		this.each(function(item){
			resp.label.push(item.get('fecha'))
			resp.data.push(item.get('rates')[item.get('mon2')])
		})
		return resp
	}

})