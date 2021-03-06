Ext.define('Orbium.view.form.SphereForm', {
    extend: 'Orbium.view.form.BodyForm',
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
                    itemId: 'geometry_radius',
                    xtype: 'numberfield',
                    name: 'geometry_radius',
                    width: 50,
                    value: 1,
                    minValue: 0.1,
                    msgTarget: 'under'
                }
            ]
        };

        this.callParent();
    },
    createBody: function(form) {

        var body = Ext.create('Orbium.model.Sphere', form);

        return body;
    }

});


