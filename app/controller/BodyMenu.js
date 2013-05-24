Ext.define('Orbium.controller.BodyMenu', {
    extend: 'Ext.app.Controller',
    init: function() {

        this.control({
            
            'orbiumbodymenu > menuitem#display_graph': {
                click: function(menuitem) {

                    var kbody = Orbium.app.mundo.indexOfBodyWithMeshId(Orbium.app.mundo.itemSelected.id);
                    var w = Ext.create('Orbium.view.ChartWindow', kbody, "", "t", "x");
                    w.show();
                }
            },
            'orbiumbodymenu > menuitem#change_properties': {
                click: function(menuitem) {
                    var kbody = Orbium.app.mundo.indexOfBodyWithMeshId(Orbium.app.mundo.itemSelected.id);
                    
                    
                    var form;
                    switch (Ext.getClassName(Orbium.app.mundo.bodies[kbody])) {
                        case 'Orbium.world.Cube':
                            form = Ext.create('Orbium.view.CubeForm');
                            form.title = 'Edit cube (' + kbody + ')';                            
                            break;
                        case 'Orbium.world.Sphere':
                            form = Ext.create('Orbium.view.SphereForm');
                            form.title = 'Edit sphere (body ' + kbody + ')';
                            break;
                    }
                    form.edition = true;
                    form.kbody = kbody;
                    form.fillForm(Orbium.app.mundo.bodies[kbody]);
                    form.show();

                }
            }
        });
    }
});