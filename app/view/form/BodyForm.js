/**
 * Base form class to ask for body params
 * --------------------------------------
 * 
 * This class is a form-window with a set of 
 * common form items to every body:
 * - position x,y,z
 * - velocity x,y,z
 * - angular velocity x,y,z
 * - mass
 * - angular damping
 * 
 * the geometric params are defined by each
 * concrete bodyform (i.e. by CubeForm, SphereForm, ...)
 * 
 * The concrete body form which extend this class, must
 * implement a method call addBody, which is responsible
 * to create the body, initialize it and add to the World
 */

Ext.define('Orbium.view.form.BodyForm', {
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
                            me.edition ? me.editBody(form) : me.addBody(form);
                            this.up('window').close();                          
                        }
                    }
                }]
        });
        this.items = cubeForm;
        this.callParent();
    },
    addBody: function(form) {

        var body = this.createBody(form);

        form.updateRecord(body);
        body.createBody();
        
        Orbium.app.mundo.addBody(body);
    },
    editBody: function(form) {
        
        var body = Orbium.app.mundo.bodyStore.getAt(this.kbody);
        form.updateRecord(body); 
        body.updatePhysicsAndMeshBodies();
    }
});


