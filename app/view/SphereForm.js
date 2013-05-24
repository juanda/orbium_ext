Ext.define('Orbium.view.SphereForm', {
    extend: 'Orbium.view.BodyForm',
    alias: 'widget.orbiumsphereform',
    title: 'Add new sphere',
    constructor: function() {

        this.bodyType = 'sphere';
        this.formGeometryItem = {
            xtype: 'fieldset',
            title: 'Geometry',
            collapsible: false,
            layout: {
                type: 'hbox',
                align: 'stretch',
                pack: 'start'
            },
            items: [
                {
                    xtype: 'label',
                    forId: 'radius',
                    text: 'Radius:',
                    margin: '10'
                },
                {
                    itemId: 'radius',
                    xtype: 'numberfield',
                    name: 'radius',
                    width: 50,
                    value: 1,
                    minValue: 0.1,
                    msgTarget: 'under'
                }

            ]
        };

        this.callParent();
    },
    fillForm: function(body) {
        this.down('#radius').setValue(body.parameters.geometry.radius);
        
        this.callParent(arguments);
    }

});


