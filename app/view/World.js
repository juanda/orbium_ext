Ext.define('Orbium.view.World', {
    extend: 'Ext.Component',
    alias: 'widget.world',
    id: 'viewer',
    
    
    initComponent: function() {
        console.log('initComponent de Orbium.view.World');                
    },
    
    getViewer: function(){
        return Ext.get('viewer').dom;
    }
   
});


