Ext.define('Orbium.view.World', {
    extend: 'Ext.Component',
    alias: 'widget.world',
    id: 'viewer',
    autoEl: {
        tag: 'div',        
        cls: 'world',         
    },
    
    onRender: function(){
        this.callParent();
        Orbium.app.mundo = Ext.create('Orbium.world.World', this.getEl());
    }

});
            
            
