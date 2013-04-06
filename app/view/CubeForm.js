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
                    xtype: 'fieldset',
                    title: 'Initial position',
                    collapsible: false,
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        pack: 'start'
                    },
                    items: [
                        {
                            xtype: 'label',
                            forId: 'x',
                            text: 'X:',
                            margin: '10'
                        },
                        {
                            xtype: 'numberfield',
                            name: 'position_x',
                            width: 70,
                            value: 0,
                            msgTarget: 'side'
                        },
                        {
                            xtype: 'label',
                            forId: 'y',
                            text: 'Y:',
                            margin: '10'
                        },
                        {
                            xtype: 'numberfield',
                            name: 'position_y',
                            width: 70,
                            value: 0
                        },
                        {
                            xtype: 'label',
                            forId: 'z',
                            text: 'Z:',
                            margin: '10'
                        },
                        {
                            xtype: 'numberfield',
                            name: 'position_z',
                            width: 70,
                            value: 0
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'Initial velocity',
                    collapsible: false,
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        pack: 'start'
                    },
                    items: [
                        {
                            xtype: 'label',
                            forId: 'x',
                            text: 'X:',
                            margin: '10'
                        },
                        {
                            xtype: 'numberfield',
                            name: 'velocity_x',
                            width: 70,
                            value: 0
                        },
                        {
                            xtype: 'label',
                            forId: 'y',
                            text: 'Y:',
                            margin: '10'
                        },
                        {
                            xtype: 'numberfield',
                            name: 'velocity_y',
                            width: 70,
                            value: 0
                        },
                        {
                            xtype: 'label',
                            forId: 'z',
                            text: 'Z:',
                            margin: '10'
                        },
                        {
                            xtype: 'numberfield',
                            name: 'velocity_z',
                            width: 70,
                            value: 0
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'Initial angular velocity',
                    collapsible: false,
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        pack: 'start'
                    },
                    items: [
                        {
                            xtype: 'label',
                            forId: 'x',
                            text: 'X:',
                            margin: '10'
                        },
                        {
                            xtype: 'numberfield',
                            name: 'angularVelocity_x',
                            width: 70,
                            value: 0
                        },
                        {
                            xtype: 'label',
                            forId: 'y',
                            text: 'Y:',
                            margin: '10'
                        },
                        {
                            xtype: 'numberfield',
                            name: 'angularVelocity_y',
                            width: 70,
                            value: 0
                        },
                        {
                            xtype: 'label',
                            forId: 'z',
                            text: 'Z:',
                            margin: '10'
                        },
                        {
                            xtype: 'numberfield',
                            name: 'angularVelocity_z',
                            width: 70,
                            value: 0
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'Physics parameters',
                    collapsible: false,
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        pack: 'start'
                    },
                    items: [
                        {
                            xtype: 'label',
                            forId: 'mass',
                            text: 'Mass:',
                            margin: '10'
                        },
                        {
                            xtype: 'numberfield',
                            name: 'mass',
                            width: 70,
                            value: 1

                        },
                        {
                            xtype: 'label',
                            forId: 'angularDamping',
                            text: 'Angular damping:',
                            margin: '10'
                        },
                        {
                            xtype: 'numberfield',
                            name: 'angularDamping',
                            width: 70,
                            value: 0
                        },
                    ]
                },
                {
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


