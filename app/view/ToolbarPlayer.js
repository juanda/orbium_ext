Ext.define('Orbium.view.ToolbarPlayer', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.orbiumtoolbarplayer',
    width: 200,
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
            }            
          
        ];


        this.callParent();
    }
});


