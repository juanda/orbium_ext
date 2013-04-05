Ext.define('Orbium.view.CubeForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.orbiumcubeform',
    width: 400,
    height: 400,
    minimizable: false,
    animCollapse: true,
    layout: 'fit',
    title: 'Add new cube',
    initComponent: function() {

        var cubeForm = Ext.create('Ext.form.Panel', {
            defaultType: 'textfield',
            bodyPadding: 10,
            items: [{
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Initial conditions',
                     collapsible: true,
                    defaults: {
                        labelWidth: 89,
                        anchor: '100%',
                        layout: {
                            type: 'hbox',
                            defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
                        }
                    },
                    items: [
                        {
                            xtype: 'numberfield',
                            //anchor: '100%',
                            name: 'position_x',
                            fieldLabel: 'Position X',
                            value: 0
                        },
                        {
                            xtype: 'numberfield',
//                    anchor: '100%',
                            name: 'position_y',
                            fieldLabel: 'Position Y',
                            value: 0
                        },
                        {
                            xtype: 'numberfield',
//                    anchor: '100%',
                            name: 'position_z',
                            fieldLabel: 'Position Z',
                            value: 0
                        },
                        {
                            xtype: 'numberfield',
//                    anchor: '100%',
                            name: 'velocity_x',
                            fieldLabel: 'Velocity X',
                            value: 0
                        },
                        {
                            xtype: 'numberfield',
//                    anchor: '100%',
                            name: 'velocity_y',
                            fieldLabel: 'Velocity Y',
                            value: 0
                        },
                        {
                            xtype: 'numberfield',
//                    anchor: '100%',
                            name: 'velocity_z',
                            fieldLabel: 'Position Z',
                            value: 0
                        },
                        {
                            xtype: 'numberfield',
//                    anchor: '100%',
                            name: 'angularVelocity_x',
                            fieldLabel: 'Angular velocity X',
                            value: 0
                        },
                        {
                            xtype: 'numberfield',
//                    anchor: '100%',
                            name: 'angularVelocity_y',
                            fieldLabel: 'Angular velocity Y',
                            value: 0
                        },
                        {
                            xtype: 'numberfield',
//                    anchor: '100%',
                            name: 'angularVelocity_z',
                            fieldLabel: 'Angular velocity Z',
                            value: 0
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Physics parameters',
                    items: [
                        {
                            xtype: 'numberfield',
                            //anchor: '100%',
                            name: 'mass',
                            fieldLabel: 'Mass',
                            value: 0
                        },
                        {
                            xtype: 'numberfield',
                            //anchor: '100%',
                            name: 'angularDamping',
                            fieldLabel: 'Angular damping',
                            value: 0
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Geometry',
                    items: [
                        {
                            xtype: 'numberfield',
                            //anchor: '100%',
                            name: 'width',
                            fieldLabel: 'Width',
                            value: 0
                        },
                        {
                            xtype: 'numberfield',
                            //anchor: '100%',
                            name: 'height',
                            fieldLabel: 'Height',
                            value: 0
                        },
                        {
                            xtype: 'numberfield',
                            //anchor: '100%',
                            name: 'depth',
                            fieldLabel: 'Depth',
                            value: 0
                        }

                    ]
                }

            ],
            buttons: [{
                    text: 'Reset',
                    handler: function() {
                        this.up('form').getForm().reset();
                    }
                }, {
                    text: 'Submit',
                    formBind: true, //only enabled once the form is valid
                    disabled: true,
                    handler: function() {
                        var form = this.up('form').getForm();
                        if (form.isValid()) {
                            console.log(form.getValues());
//                            Orbium.app.mundo.addCube(form.getValues());
//                            form.submit({
//                                success: function(form, action) {
//                                    Ext.Msg.alert('Success', action.result.msg);
//                                },
//                                failure: function(form, action) {
//                                    Ext.Msg.alert('Failed', action.result.msg);
//                                }
//                            });
                        }
                    }
                }]
        });

        this.items = cubeForm;

        this.callParent();
    }

});


