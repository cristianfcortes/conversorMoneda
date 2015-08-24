var vGrafica = Backbone.View.extend({
  events:{
    'click': 'clickPoint'
  },
  clickPoint: function(evt){

        var point = this.myLineChart.getPointsAtEvent(evt)[0];
        var mPoint = this.collection.where({value:point.value})[0]

        var tooltipEl = $('#chartjs-tooltip');
        var tooltip = new vDetalleTooltip({el:'#chartjs-tooltip', collection: this.collection, model:mPoint })
        tooltip.render()
  },
  initialize:function(){
    this.collection = new cMoneda()
    var self = this
    Chart.defaults.global.responsive = true;
    this.options = {
      customTooltips: function(tooltip){
        var tooltipEl = $('#chartjs-tooltip');

        if (!tooltip) {
            tooltipEl.css({
                opacity: 0
            });
            return;
        }

        tooltipEl.removeClass('above below');
        tooltipEl.addClass(tooltip.yAlign);

        tooltipEl.css({
            opacity: 1,
            left: tooltip.chart.canvas.offsetLeft + tooltip.x + 'px',
            top: tooltip.chart.canvas.offsetTop + tooltip.y + 'px',
            fontFamily: tooltip.fontFamily,
            fontSize: tooltip.fontSize,
            fontStyle: tooltip.fontStyle,
        });
      },
    }

    this.collection.traeRango().done(function(data){
      var resp = self.collection.getDataGraf()
      // Eliminamos el primer dato
      resp.label.shift()
      resp.data.shift()

      self.data = {
        labels:resp.label,
        datasets:[{data:resp.data}]
      }
      self.render()
    })
  },
  cambioMoneda:function(base,otro){
    var self = this
    this.collection = new cMoneda()
    this.collection.traeRango(base,otro).done(function(data){
      var resp = self.collection.getDataGraf()
      // Eliminamos el primer dato
      resp.label.shift()
      resp.data.shift()

      self.data = {
        labels:resp.label,
        datasets:[{data:resp.data}]
      }
      self.render()
    })

  },
  template:function(){
    
  },
  render:function(){
    if(this.myLineChart){
      this.myLineChart.removeData()
    }
    
    var ctx = this.$el.get(0).getContext("2d");
    this.myLineChart = new Chart(ctx).Line(this.data, this.options);
    return this
  }
})