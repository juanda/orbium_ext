Ext.define('Orbium.controller.BodyMenu', {
    extend: 'Ext.app.Controller',
    init: function() {

        this.control({
            'orbiumbodymenu > menuitem#change_properties': {
                click: function(menuitem) {
                    console.log(menuitem);
                }
            }
        });
    }
});