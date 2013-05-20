Ext.define('Orbium.controller.BodyMenu', {
    extend: 'Ext.app.Controller',
    init: function() {

        this.control({
            'orbiumbodymenu > menuitem#change_properties': {
                click: function(menuitem) {

                }
            },
            'orbiumbodymenu > menuitem#display_graph': {
                click: function(menuitem) {
                                       
                    var kbody = Orbium.app.mundo.indexOfBodyWithMeshId(Orbium.app.mundo.itemSelected.id);
                    var w = Ext.create('Orbium.view.ChartWindow', kbody, "Velocity vs time", "x", "y");
                    w.show();
                }
            }
        });
    }
});