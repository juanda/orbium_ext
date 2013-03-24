Ext.define('Orbium.view.Toolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.orbiumtoolbar',
    initComponent: function() {
        this.items = [
            {
                xtype: 'button', // default for Toolbars
                name: 'play',
                text: 'play',               
            },
            {
                xtype: 'button',
                name: 'pause',
                text: 'pause'
            },
            {
                xtype: 'button',
                name: 'stop',
                text: 'stop'
            },
            {
                xtype: 'button',
                name: 'gravity',
                text: 'gravity',
                enableToggle: true
            }
          
        ];


        this.callParent();
    }
});


