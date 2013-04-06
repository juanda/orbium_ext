Ext.define('Orbium.view.CubeForm', {
    extend: 'Orbium.view.BodyForm',
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
                    xtype: 'numberfield',
                    name: 'width',
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
                    xtype: 'numberfield',
                    name: 'height',
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
                    xtype: 'numberfield',
                    name: 'depth',
                    width: 50,
                    value: 1
                }
            ]
        };

        this.callParent();

    }

});


