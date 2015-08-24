var vDetalleTooltip = Backbone.View.extend({
  initialize:function(){
    var self = this
    this.mPointAnt = this.collection.at(this.collection.indexOf(this.model) - 1)
  },
  variacion:function(){
    return this.model.get('value')-this.mPointAnt.get('value')
  },
  template:function(){
    var html = ['<table class="columns"><tbody>',
                '<tr><td>Fecha</td><td>'+this.model.get('fecha')+'</td></tr>',
                '<tr><td>1 '+this.model.get('base')+'</td><td>'+this.model.get('value')+' '+this.model.get('mon2')+'</td></tr>',
                '<tr><td>Variacion</td><td>'+this.variacion()+'</td></tr>',
                '</tbody></table>'].join('');
    return html
  },
  render:function(){
    var html = this.template()
    this.$el.html(html)
    return this
  }
})