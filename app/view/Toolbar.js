Ext.define('Orbium.view.Toolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.orbiumtoolbar',
    initComponent: function() {
        this.items = [
            {
                xtype: 'button', // default for Toolbars
                action: 'play',
                text: 'play',               
            },
            {
                xtype: 'button',
                action: 'pause',
                text: 'pause'
            },
            {
                xtype: 'button',
                action: 'stop',
                text: 'stop'
            },
            {
                xtype: 'button',
                action: 'addCube',
                text: 'Add Cube'
            },
            {
                xtype: 'button',
                action: 'addBall',
                text: 'Add Ball'
            },
            {
                xtype: 'button',
                action: 'gravity',
                text: 'gravity',
                enableToggle: true
            }
          
        ];


        this.callParent();
    }
});


