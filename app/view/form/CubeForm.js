Ext.define('Orbium.view.form.CubeForm', {
    extend: 'Orbium.view.form.BodyForm',
    alias: 'widget.orbiumcubeform',
    title: 'Add new cube',
    constructor: function() {

        this.bodyType = 'cube';
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
                    forId: 'width',
                    text: 'Width:',
                    margin: '10'
                },
                {
                    itemId: 'geometry_width',
                    xtype: 'numberfield',
                    name: 'geometry_width',
                    width: 50,
                    value: 1
                },
                {
                    xtype: 'label',
                    forId: 'height',
                    text: 'Height:',
                    margin: '10'
                },
                {
                    itemId: 'geometry_height',
                    xtype: 'numberfield',
                    name: 'geometry_height',
                    width: 50,
                    value: 1
                },
                {
                    xtype: 'label',
                    forId: 'depth',
                    text: 'Depth:',
                    margin: '10'
                },
                {
                    itemId: 'geometry_depth',
                    xtype: 'numberfield',
                    name: 'geometry_depth',
                    width: 50,
                    value: 1
                }
            ]
        };

        this.callParent();

    },
    createBody: function(form) {
        
        var body = Ext.create('Orbium.model.Cube', form);
           
        return body;               
    }
});


