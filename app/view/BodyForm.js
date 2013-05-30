Ext.define('Orbium.view.BodyForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.orbiumbodyform',
    width: 400,
    height: 400,
    minimizable: false,
    animCollapse: true,
    layout: 'fit',
    modal: true,
    edition: false,
    constructor: function() {

        this.formItems = [{
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
                        itemId: 'position_x',
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
                        itemId: 'position_y',
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
                        itemId: 'position_z',
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
                        itemId: 'velocity_x',
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
                        itemId: 'velocity_y',
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
                        itemId: 'velocity_z',
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
                        itemId: 'angularVelocity_x',
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
                        itemId: 'angularVelocity_y',
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
                        itemId: 'angularVelocity_z',
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
                        itemId: 'physicParams_mass',
                        xtype: 'numberfield',
                        name: 'physicParams_mass',
                        width: 70,
                        value: 1,
                        minValue: 0.1,
                        msgTarget: 'under'
                    },
                    {
                        xtype: 'label',
                        forId: 'angularDamping',
                        text: 'Angular damping:',
                        margin: '10'
                    },
                    {
                        itemId: 'physicParams_angularDamping',
                        xtype: 'numberfield',
                        name: 'physicParams_angularDamping',
                        width: 70,
                        value: 0,
                        minValue: 0,
                        maxValue: 2,
                        msgTarget: 'under'
                    }
                ]
            }];
        this.formItems.push(this.formGeometryItem);
        this.callParent();
    },
    initComponent: function() {
        var me = this;
        var cubeForm = Ext.create('Ext.form.Panel', {
            defaultType: 'textfield',
            bodyPadding: 10,
            items: me.formItems,
            buttons: [{
                    text: 'Reset',
                    handler: function() {
                        this.up('form').getForm().reset();
                    }
                }, {
                    text: 'Submit',
                    formBind: true, //only enabled once the form is valid

                    handler: function() {

                        var form = this.up('form').getForm();
                        if (form.isValid()) {
                            switch (me.bodyType) {
                                case 'cube':
                                    me.addBody(form);
//                                    me.edition ? Orbium.app.mundo.editCube(me.kbody, form.getValues()) :
//                                            Orbium.app.mundo.addCube(form.getValues());
                                    break;
                                case 'sphere':
                                    me.edition ? Orbium.app.mundo.editSphere(me.kbody, form.getValues()) :
                                            Orbium.app.mundo.addSphere(form.getValues());
                                    break;
                            }
                            this.up('window').close();
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
    },
    
    fillForm: function(body) {

        this.down('#position_x').setValue(body.parameters.initialConditions.position.x);
        this.down('#position_y').setValue(body.parameters.initialConditions.position.y);
        this.down('#position_z').setValue(body.parameters.initialConditions.position.z);
        this.down('#velocity_x').setValue(body.parameters.initialConditions.velocity.x);
        this.down('#velocity_y').setValue(body.parameters.initialConditions.velocity.y);
        this.down('#velocity_z').setValue(body.parameters.initialConditions.velocity.z);
        this.down('#angularVelocity_x').setValue(body.parameters.initialConditions.angularVelocity.x);
        this.down('#angularVelocity_y').setValue(body.parameters.initialConditions.angularVelocity.y);
        this.down('#angularVelocity_z').setValue(body.parameters.initialConditions.angularVelocity.z);
        this.down('#mass').setValue(body.parameters.physicsParams.mass);
        this.down('#angularDamping').setValue(body.parameters.physicsParams.angularDamping);
    }

});


