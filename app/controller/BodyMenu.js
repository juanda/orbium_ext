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
                    var className = Ext.getClassName(Orbium.app.mundo.bodyStore.getAt(kbody));
                    switch (className) {
                        case 'Orbium.model.Cube':
                            form = Ext.create('Orbium.view.form.CubeForm');
                            form.title = 'Edit cube (' + kbody + ')';                            
                            break;
                        case 'Orbium.model.Sphere':
                            form = Ext.create('Orbium.view.form.SphereForm');
                            form.title = 'Edit sphere (body ' + kbody + ')';
                            break;
                    }
                    form.edition = true;
                    form.kbody = kbody;
                    console.log(form.items.items[0].form);
                    form.items.items[0].form.loadRecord(Orbium.app.mundo.bodyStore.getAt(kbody));
                    
                    form.show();

                }
            }
        });
    }
});