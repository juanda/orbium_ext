Ext.define('Orbium.view.CubeForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.orbiumcubeform',
    height: 130,
    width: 280,
    bodyPadding: 10,
    defaultType: 'textfield',
    items: [
        {
            xtype: 'numberfield',
            anchor: '100%',
            name: 'position_x',
            fieldLabel: 'Position X',
            value: 0,
//            maxValue: 99,
//            minValue: 0
        },
        {
            xtype: 'numberfield',
            anchor: '100%',
            name: 'position_y',
            fieldLabel: 'Position Y',
            value: 0
        },
        {
            xtype: 'numberfield',
            anchor: '100%',
            name: 'position_z',
            fieldLabel: 'Position Z',
            value: 0
        }
    ]
});


