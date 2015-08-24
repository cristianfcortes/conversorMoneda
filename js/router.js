
Base.Router = Backbone.Router.extend({
    routes: {
        "": "index",
    },
    initialize: function (){
        Backbone.history.start({root: "/"});
    },
    //Metodo se ejecuta antes de entrar a cualquier controlador
    execute:function(call,args){
        // Aqui el codigo adicional
        call.apply(this,args)
    },
    index: function(){
        var graf = new vGrafica({el: '#myChart'})
        $('#monedaBase, #monedaOtro').on('change', function(){
          graf.cambioMoneda($('#monedaBase').val(),$('#monedaOtro').val())
        })

    }, 
});
// Instantiate the router

$(function(){
    Base.app = new Base.Router();
});

var originalNavigate = Backbone.history.navigate;
Backbone.history.navigate = function(fragment, options){
    originalNavigate.apply(this, arguments);
    $(document).foundation();
}

